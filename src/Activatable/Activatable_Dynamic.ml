type single = {
  options : Id.Activatable.Option.t list;
  level : int option;
  customCost : int option;
}

type dependency = {
  source : Id.Activatable.t;
  target : int OneOrMany.t;
  active : bool;
  options : Id.Activatable.SelectOption.t OneOrMany.t list;
  level : int option;
}

type 'static t = {
  id : int;
  active : single list;
  dependencies : dependency list;
  static : 'static option;
}

let empty static id = { id; active = []; dependencies = []; static }

let is_empty (x : 'a t) = Ley_List.null x.active && Ley_List.null x.dependencies

module type S = sig
  type static

  type nonrec t = static t
  (** The dynamic values in a character with a reference to the static values
      from the database. *)

  val empty : static option -> int -> t
  (** [empty id] creates a new dynamic entry from an id. *)

  val is_empty : t -> bool
  (** [is_empty x] checks if the passed dynamic entry is empty. *)
end

module Make (S : sig
  type static
end) =
struct
  type static = S.static

  type nonrec t = static t

  let empty = empty

  let is_empty = is_empty
end
