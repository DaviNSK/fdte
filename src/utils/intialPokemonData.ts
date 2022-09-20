import { PokemonData } from 'context/Pokemons/types';

export const initialPokemonData: PokemonData = {
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
  stats: [
    {
      base_stat: 0,
      effort: 0,
      stat: {
        name: '',
      },
    },
  ],
  types: [
    {
      type: {
        name: '',
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: '',
      },
    },
  ],
};
