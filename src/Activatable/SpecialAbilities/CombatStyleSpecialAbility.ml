module Shared = Activatable_Shared

module Static = struct
  type t = {
    id : int;
    name : string;
    nameInWiki : string option;
    levels : int option;
    max : int option;
    category : Shared.CombatSpecialAbilityType.t;
    isArmed : bool;
    rules : string;
    selectOptions : SelectOption.map;
    input : string option;
    penalty : string option;
    advanced : Shared.AdvancedSpecialAbilities.t;
    prerequisites : Prerequisite.Collection.AdvantageDisadvantage.t;
    prerequisitesText : string option;
    prerequisitesTextStart : string option;
    prerequisitesTextEnd : string option;
    combatTechniques : Shared.ApplicableCombatTechniques.t;
    apValue : Shared.ApValue.t option;
    apValueText : string option;
    apValueTextAppend : string option;
    src : PublicationRef.list;
    errata : Erratum.list;
  }

  module Decode = Shared.Decode.Make (struct
    type nonrec t = t

    module Translation = struct
      type t = {
        name : string;
        nameInWiki : string option;
        rules : string;
        input : string option;
        penalty : string option;
        prerequisites : string option;
        prerequisitesStart : string option;
        prerequisitesEnd : string option;
        apValue : string option;
        apValueAppend : string option;
        errata : Erratum.list option;
      }

      let t json =
        Json_Decode_Strict.
          {
            name = json |> field "name" Shared.Name.Decode.t;
            nameInWiki =
              json |> optionalField "nameInWiki" Shared.NameInLibrary.Decode.t;
            rules = json |> field "rules" Shared.Rules.Decode.t;
            input = json |> optionalField "input" Shared.Input.Decode.t;
            penalty = json |> optionalField "penalty" Shared.Input.Decode.t;
            prerequisites =
              json
              |> optionalField "prerequisites"
                   Shared.PrerequisitesReplacement.Decode.t;
            prerequisitesStart =
              json
              |> optionalField "prerequisitesStart"
                   Shared.PrerequisitesStart.Decode.t;
            prerequisitesEnd =
              json
              |> optionalField "prerequisitesEnd"
                   Shared.PrerequisitesEnd.Decode.t;
            apValue =
              json |> optionalField "apValue" Shared.ApValueReplacement.Decode.t;
            apValueAppend =
              json
              |> optionalField "apValueAppend" Shared.ApValueAppend.Decode.t;
            errata = json |> optionalField "errata" Erratum.Decode.list;
          }

      let pred _ = true
    end

    type multilingual = {
      id : int;
      levels : int option;
      max : int option;
      category : Shared.CombatSpecialAbilityType.t;
      isArmed : bool;
      selectOptions : SelectOption.Decode.multilingual option;
      advanced : Shared.AdvancedSpecialAbilities.t;
      prerequisites :
        Prerequisite.Collection.AdvantageDisadvantage.Decode.multilingual;
      combatTechniques : Shared.ApplicableCombatTechniques.t;
      apValue : Shared.ApValue.t option;
      src : PublicationRef.Decode.multilingual list;
      translations : Translation.t Json_Decode_TranslationMap.partial;
    }

    let multilingual decodeTranslations json =
      Json_Decode_Strict.
        {
          id = json |> field "id" int;
          levels = json |> optionalField "levels" int;
          max = json |> optionalField "max" int;
          category =
            json |> field "max" Shared.CombatSpecialAbilityType.Decode.t;
          isArmed = json |> field "isArmed" bool;
          selectOptions =
            json
            |> optionalField "selectOptions" SelectOption.Decode.multilingual;
          advanced =
            json |> field "advanced" Shared.AdvancedSpecialAbilities.Decode.t;
          prerequisites =
            json
            |> field "prerequisites"
                 Prerequisite.Collection.AdvantageDisadvantage.Decode
                 .multilingual;
          combatTechniques =
            json
            |> field "combatTechniques"
                 Shared.ApplicableCombatTechniques.Decode.t;
          apValue = json |> optionalField "apValue" Shared.ApValue.Decode.t;
          src = json |> field "src" PublicationRef.Decode.multilingualList;
          translations = json |> field "translations" decodeTranslations;
        }

    let make ~resolveSelectOptions langs (multilingual : multilingual)
        (translation : Translation.t) =
      let src =
        PublicationRef.Decode.resolveTranslationsList langs multilingual.src
      in
      let errata = translation.errata |> Ley_Option.fromOption [] in
      Some
        ( multilingual.id,
          {
            id = multilingual.id;
            name = translation.name;
            nameInWiki = translation.nameInWiki;
            levels = multilingual.levels;
            max = multilingual.max;
            category = multilingual.category;
            isArmed = multilingual.isArmed;
            rules = translation.rules;
            selectOptions =
              multilingual.selectOptions
              |> Ley_Option.option SelectOption.Map.empty
                   (resolveSelectOptions ~src ~errata langs);
            input = translation.input;
            penalty = translation.penalty;
            advanced = multilingual.advanced;
            prerequisites =
              Prerequisite.Collection.AdvantageDisadvantage.Decode
              .resolveTranslations langs multilingual.prerequisites;
            prerequisitesText = translation.prerequisites;
            prerequisitesTextStart = translation.prerequisitesStart;
            prerequisitesTextEnd = translation.prerequisitesEnd;
            combatTechniques = multilingual.combatTechniques;
            apValue = multilingual.apValue;
            apValueText = translation.apValue;
            apValueTextAppend = translation.apValueAppend;
            src;
            errata;
          } )

    module Accessors = struct
      let translations x = x.translations
    end
  end)
end

module Dynamic = Activatable_Dynamic.Make (struct
  type static = Static.t
end)
