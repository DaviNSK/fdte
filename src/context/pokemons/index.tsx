import { fetchPokemonById } from 'config/Pokemons';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as T from './types';
import { Dispatch, SetStateAction } from 'react';

export interface ContextValue {
  pokemonData: T.PokemonData | undefined;
  setPokemonData: Dispatch<SetStateAction<T.PokemonData | undefined>>;
  fetchPokemon: (id: any) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  openModal: string;
  setOpenModal: Dispatch<SetStateAction<string>>;
  capturePokemon: () => void;
}

export const PokemonsContext = React.createContext<ContextValue | undefined>(
  undefined,
);

export const PokemonsProvider: React.FC = (props) => {
  const [pokemonData, setPokemonData] = useState<T.PokemonData>();
  const [listPokemons, setListPokemons] = useState<T.PokemonData[]>([]);
  const [openModal, setOpenModal] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPokemon = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const response = await fetchPokemonById(id);

        console.log(response);
        setPokemonData(response.data);
        setLoading(false);
        setOpenModal('viewPokemon');
      } catch {
        setLoading(false);
      }
    },
    [setPokemonData, setLoading, setOpenModal],
  );

  const capturePokemon = useCallback(() => {
    if (!pokemonData) return;

    setListPokemons((prevState) => {
      const newState = [...prevState, pokemonData];

      localStorage.setItem('listPokemons', JSON.stringify(newState));

      return newState;
    });
    setOpenModal('');
  }, [setListPokemons, pokemonData, setOpenModal]);

  useEffect(() => {
    console.log(listPokemons, pokemonData);
  }, [listPokemons, pokemonData]);

  const value = useMemo(
    () => ({
      pokemonData,
      setPokemonData,
      fetchPokemon,
      loading,
      setLoading,
      openModal,
      setOpenModal,
      capturePokemon,
    }),
    [
      pokemonData,
      setPokemonData,
      fetchPokemon,
      loading,
      setLoading,
      openModal,
      setOpenModal,
      capturePokemon,
    ],
  );

  return <PokemonsContext.Provider value={value} {...props} />;
};

export const usePokemons = (): ContextValue => {
  const context = useContext(PokemonsContext);

  if (context === undefined) {
    throw new Error('usePokemons must be used within an PokemonsProvider');
  }

  return context;
};
