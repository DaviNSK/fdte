import { Dispatch, SetStateAction } from 'react';

export interface ContextValue {
  pokemonData: PokemonData | undefined;
  setPokemonData: Dispatch<SetStateAction<PokemonData | undefined>>;
  fetchPokemon: (id: any) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface PokemonData {
  name: string;
  height: number;
  weight: number;
}
