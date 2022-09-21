import { PokemonData } from "context/Pokemons/types";

const pokemonImage = (value: PokemonData) => {
  return value?.sprites.other
    ? value?.sprites.other['official-artwork'].front_default
    : value?.sprites.front_default;
};

export default pokemonImage;
