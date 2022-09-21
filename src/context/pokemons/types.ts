export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: SpritesTypes;
  stats: StatsTypes[];
  types: BadgeTypes[];
  abilities: AbilitiesTypes[];
}

export interface SpritesTypes {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface StatsTypes {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface BadgeTypes {
  type: {
    name: string;
  };
}

export interface AbilitiesTypes {
  ability: {
    name: string;
  };
}
export interface IPokeType {
  name: string;
  dafaultColor: string;
}

export interface IObjectKeys {
  [key: string]: IPokeType;
}
