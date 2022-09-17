import { fetchPokemonById } from 'config/pokemons';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import * as T from './types';

export const PokemonsContext = React.createContext<T.ContextValue | undefined>(
  undefined,
);

export const PokemonsProvider: React.FC = (props) => {
  const [pokemonData, setPokemonData] = useState<T.PokemonData>();
  const [loading, setLoading] = useState(false);

  const fetchPokemon = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const response = await fetchPokemonById(id);
        console.log(response);
        setPokemonData(response.data);
        setLoading(false);
        // setTimeout(() => {
         
        // }, 2000);
      } catch {
        setLoading(false);
      }
    },
    [setPokemonData, setLoading],
  );

  const value = useMemo(
    () => ({ pokemonData, setPokemonData, fetchPokemon, loading, setLoading }),
    [pokemonData, setPokemonData, fetchPokemon, loading, setLoading],
  );

  return <PokemonsContext.Provider value={value} {...props} />;
};

export const usePokemons = (): T.ContextValue => {
  const context = useContext(PokemonsContext);

  if (context === undefined) {
    throw new Error('usePokemons must be used within an PokemonsProvider');
  }

  return context;
};
