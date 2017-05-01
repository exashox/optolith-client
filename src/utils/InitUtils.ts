import * as Categories from '../constants/Categories';
import { AdvantageInstance, AttributeInstance, BlessingInstance, CantripInstance, CombatTechniqueInstance, CultureInstance, DisadvantageInstance, ItemInstance, LiturgyInstance, ProfessionInstance, ProfessionVariantInstance, RaceInstance, SpecialAbilityInstance, SpellInstance, TalentInstance } from '../types/data.d';
import { RawAdvantage, RawAttribute, RawBlessing, RawCantrip, RawCombatTechnique, RawCulture, RawDisadvantage, RawItem, RawLiturgy, RawProfession, RawProfessionVariant, RawRace, RawSpecialAbility, RawSpell, RawTalent } from '../types/rawdata.d';

export function initRace(raw: RawRace): RaceInstance {
	const { id, name, ap, attr, attr_sel, auto_adv, autoAdvCost, eyes, gs, hair, imp_adv, imp_dadv, le, typ_adv, typ_cultures, typ_dadv, size, sk, untyp_adv, untyp_dadv, weight, zk } = raw;
	return {
		ap,
		attributeSelection: [attr_sel[0], attr_sel[1].map(k => `ATTR_${k}`)],
		attributes: attr.map<[number, string]>(e => [e[0], `ATTR_${e[1]}`]),
		autoAdvantages: auto_adv.map(e => `ADV_${e}`),
		automaticAdvantagesCost: autoAdvCost,
		category: Categories.RACES,
		eyeColors: eyes,
		hairColors: hair,
		id,
		importantAdvantages: imp_adv.map(e => `ADV_${e}`),
		importantDisadvantages: imp_dadv.map(e => `DISADV_${e}`),
		lp: le,
		mov: gs,
		name,
		size,
		spi: sk,
		tou: zk,
		typicalAdvantages: typ_adv.map(e => `ADV_${e}`),
		typicalCultures: typ_cultures.map(e => `C_${e}`),
		typicalDisadvantages: typ_dadv.map(e => `DISADV_${e}`),
		untypicalAdvantages: untyp_adv.map(e => `ADV_${e}`),
		untypicalDisadvantages: untyp_dadv.map(e => `DISADV_${e}`),
		weight,
	};
}

export function initCulture(raw: RawCulture): CultureInstance {
	const { id, name, ap, lang, literacy, social, typ_prof, typ_adv, typ_dadv, untyp_adv, untyp_dadv, typ_talents, untyp_talents, talents } = raw;
	return {
		ap,
		category: Categories.CULTURES,
		id,
		languages: lang,
		name,
		scripts: literacy,
		socialTiers: social,
		talents: talents.map<[string, number]>(e => [`TAL_${e[0]}`, e[1]]),
		typicalAdvantages: typ_adv.map(e => `ADV_${e}`),
		typicalDisadvantages: typ_dadv.map(e => `DISADV_${e}`),
		typicalProfessions: typ_prof,
		typicalTalents: typ_talents.map(e => `TAL_${e}`),
		untypicalAdvantages: untyp_adv.map(e => `ADV_${e}`),
		untypicalDisadvantages: untyp_dadv.map(e => `DISADV_${e}`),
		untypicalTalents: untyp_talents.map(e => `TAL_${e}`),
	};
}

export function initProfession(raw: RawProfession): ProfessionInstance {
	const { id, name, subname, ap, pre_req, req, sel, sa, combattech, talents, spells, chants, typ_adv, typ_dadv, untyp_adv, untyp_dadv, vars, gr, src, blessings, sgr } = raw;
	return {
		ap,
		category: Categories.PROFESSIONS,
		combatTechniques: combattech.map<[string, number]>(e => [`CT_${e[0]}`, e[1]]),
		dependencies: pre_req,
		id,
		liturgies: chants.map<[string, number]>(e => [`LITURGY_${e[0]}`, e[1]]),
		blessings: blessings.map(e => `BLESSING_${e[0]}`),
		name,
		requires: req,
		selections: sel,
		specialAbilities: sa,
		spells: spells.map<[string, number]>(e => [`SPELL_${e[0]}`, e[1]]),
		subname,
		talents: talents.map<[string, number]>(e => [`TAL_${e[0]}`, e[1]]),
		typicalAdvantages: typ_adv.map(e => `ADV_${e}`),
		typicalDisadvantages: typ_dadv.map(e => `DISADV_${e}`),
		untypicalAdvantages: untyp_adv.map(e => `ADV_${e}`),
		untypicalDisadvantages: untyp_dadv.map(e => `DISADV_${e}`),
		variants: vars.map(e => `PV_${e}`),
		gr,
		subgr: sgr,
		src
	};
}

export function initProfessionVariant(raw: RawProfessionVariant): ProfessionVariantInstance {
	const { id, name, ap, pre_req, req, sel, sa, combattech, talents } = raw;
	return {
		ap,
		category: Categories.PROFESSION_VARIANTS,
		combatTechniques: combattech.map<[string, number]>(e => [`CT_${e[0]}`, e[1]]),
		dependencies: pre_req,
		id,
		name,
		requires: req,
		selections: sel,
		specialAbilities: sa,
		talents: talents.map<[string, number]>(e => [`TAL_${e[0]}`, e[1]]),
	};
}

export function initAdvantage(raw: RawAdvantage): AdvantageInstance {
	const { id, name, ap, input, max, sel, req, tiers } = raw;
	return {
		active: [],
		category: Categories.ADVANTAGES,
		cost: ap,
		dependencies: [],
		id,
		input,
		max,
		name,
		reqs: req,
		sel,
		tiers,
		gr: 1
	};
}

export function initDisadvantage(raw: RawDisadvantage): DisadvantageInstance {
	const { id, name, ap, input, max, sel, req, tiers } = raw;
	return {
		active: [],
		category: Categories.DISADVANTAGES,
		cost: ap,
		dependencies: [],
		id,
		input,
		max,
		name,
		reqs: req,
		sel,
		tiers,
		gr: 1
	};
}

export function initSpecialAbility(raw: RawSpecialAbility): SpecialAbilityInstance {
	const { id, name, ap, input, max, sel, req, gr } = raw;
	return {
		active: [],
		category: Categories.SPECIAL_ABILITIES,
		cost: ap,
		dependencies: [],
		gr,
		id,
		input,
		max,
		name,
		reqs: req,
		sel,
	};
}

export function initAttribute(raw: RawAttribute): AttributeInstance {
	const { id, name, short } = raw;
	return {
		category: Categories.ATTRIBUTES,
		dependencies: [],
		ic: 5,
		id,
		mod: 0,
		name,
		short,
		value: 8,
	};
}

export function initCombatTechnique(raw: RawCombatTechnique): CombatTechniqueInstance {
	const { id, name, gr, skt, leit, bf } = raw;
	return {
		category: Categories.COMBAT_TECHNIQUES,
		dependencies: [],
		gr,
		ic: skt,
		id,
		name,
		primary: leit,
		value: 6,
		bf
	};
}

// function fixCheckIds(check: [number, number, number]): [string, string, string];
// function fixCheckIds(check: [number, number, number, string]): [string, string, string, string];
function fixCheckIds<T extends (number | string)[]>(check: T) {
	return check.map(e => typeof e === 'number' ? `ATTR_${e}` : e);
}

export function initLiturgy(raw: RawLiturgy): LiturgyInstance {
	const { id, name, check, gr, skt, aspc, trad } = raw;
	return {
		active: false,
		aspects: aspc,
		category: Categories.LITURGIES,
		check: fixCheckIds(check),
		dependencies: [],
		gr,
		ic: skt,
		id,
		name,
		tradition: trad,
		value: 0,
	};
}

export function initBlessing(raw: RawBlessing): BlessingInstance {
	const { id, name, aspc, trad, reqs } = raw;
	return {
		id,
		name,
		active: false,
		category: Categories.BLESSINGS,
		aspects: aspc,
		tradition: trad,
		reqs
	};
}

export function initSpell(raw: RawSpell): SpellInstance {
	const { id, name, check, gr, skt, merk, trad } = raw;
	return {
		active: false,
		category: Categories.SPELLS,
		check: fixCheckIds(check),
		dependencies: [],
		gr,
		ic: skt,
		id,
		name,
		property: merk,
		tradition: trad,
		value: 0
	};
}

export function initCantrip(raw: RawCantrip): CantripInstance {
	const { id, name, merk, trad, reqs } = raw;
	return {
		id,
		name,
		active: false,
		category: Categories.CANTRIPS,
		property: merk,
		tradition: trad,
		reqs
	};
}

export function initTalent(raw: RawTalent): TalentInstance {
	const { id, name, be, check, gr, skt, spec, spec_input } = raw;
	return {
		category: Categories.TALENTS,
		check,
		dependencies: [],
		encumbrance: be,
		gr,
		ic: skt,
		id,
		name,
		specialisation: spec,
		specialisationInput: spec_input,
		value: 0
	};
}

export function initItem(raw: RawItem): ItemInstance {
	const { addPenalties, ...other } = raw;
	return {
		...other,
		addPenalties,
		amount: 1,
		isTemplateLocked: true
	};
}
