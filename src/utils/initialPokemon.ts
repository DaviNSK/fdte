import { PokemonData } from 'context/Pokemons/types';

export const initialCurrentPokemon: PokemonData = {
  id: 0,
  name: '',
  height: 0,
  weight: 0,
  sprites: {
    front_default: '',
    other: {
      'official-artwork': {
        front_default: '',
      },
    },
  },
  stats: [],
  types: [],
  abilities: [],
};
