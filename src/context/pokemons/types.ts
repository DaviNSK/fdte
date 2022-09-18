export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: SpritesTypes;
  stats: StatsTypes[];
  types: BadgeTypes[];
  isCaptured?: boolean;
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
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface BadgeTypes {
  slot: number;
  type: {
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
