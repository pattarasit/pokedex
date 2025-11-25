export type Pokemon = {
  name: string;
  url: string;
};

export type DataPokemonList = {
  name: string;
  id: number;
  type: string;
  image: string;
  url: string;
};

export type EvolutionTrigger = {
  name: string;
  url: string;
};

export type EvolutionDetail = {
  base_form_id: number | null;
  gender: number | null;
  held_item: unknown;
  item: unknown;
  known_move: unknown;
  known_move_type: unknown;
  location: unknown;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: unknown;
  party_type: unknown;
  region_id: number | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: unknown;
  trigger: EvolutionTrigger;
  turn_upside_down: boolean;
};

export type PokemonSpecies = {
  name: string;
  url: string;
};

export type EvolutionChainTo = {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainTo[];
  is_baby: boolean;
  species: PokemonSpecies;
};

export type EvolutionChain = {
  baby_trigger_item: unknown;
  id: number;
  chain: EvolutionChainTo;
};

export type PokemonSprites = {
  front_default: string;
  front_shiny: string;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string;
  back_shiny: string;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    dream_world?: {
      front_default: string;
      front_female: string | null;
    };
    'official-artwork'?: {
      front_default: string;
      front_shiny: string;
    };
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  abilities: PokemonAbility[];
  forms: Pokemon[];
  game_indices: Array<{
    game_index: number;
    version: Pokemon;
  }>;
  held_items: unknown[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: Pokemon;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
};