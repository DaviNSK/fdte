import { fetchPokemonById } from 'config/Pokemons';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PokemonData } from './types';
import { Dispatch, SetStateAction } from 'react';

export interface ContextValue {
  pokemonData: PokemonData | undefined;
  setPokemonData: Dispatch<SetStateAction<PokemonData | undefined>>;
  fetchPokemon: (id: any) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  openModal: string;
  setOpenModal: Dispatch<SetStateAction<string>>;
  listPokemons: PokemonData[];
  capturePokemon: () => void;
  imagePokemon: (value: PokemonData | undefined | null) => string;
}

export const PokemonsContext = React.createContext<ContextValue | undefined>(
  undefined,
);

export const PokemonsProvider: React.FC = (props) => {
  const [pokemonData, setPokemonData] = useState<PokemonData>();
  const [listPokemons, setListPokemons] = useState<PokemonData[]>([]);
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
    const listPokemonsStorage = localStorage.getItem('listPokemons');

    if (!listPokemonsStorage) return;

    setListPokemons(JSON.parse(listPokemonsStorage));
  }, []);

  const imagePokemon = useCallback((value) => {
    return value?.sprites.other
      ? value?.sprites.other['official-artwork'].front_default
      : value?.sprites.front_default;
  }, []);

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
      listPokemons,
      imagePokemon,
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
      listPokemons,
      imagePokemon,
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
