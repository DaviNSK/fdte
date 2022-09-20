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
  pokemonData: PokemonData;
  setPokemonData: Dispatch<SetStateAction<PokemonData>>;
  fetchPokemon: (id: any) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  openModal: string;
  setOpenModal: Dispatch<SetStateAction<string>>;
  listPokemons: PokemonData[];
  setListPokemons: Dispatch<SetStateAction<PokemonData[]>>;
  capturePokemon: () => void;
  imagePokemon: (value: PokemonData | undefined | null) => string;
  isPokemonCaptured: boolean;
  setIsPokemonCaptured: Dispatch<SetStateAction<boolean>>;
  getRandomId: (min: number, max: number) => number;
  editPokemon: string;
  setEditPokemon: Dispatch<SetStateAction<string>>;
}

export const PokemonsContext = React.createContext<ContextValue | undefined>(
  undefined,
);

export const PokemonsProvider: React.FC = (props) => {
  const [listPokemons, setListPokemons] = useState<PokemonData[]>([]);
  const [isPokemonCaptured, setIsPokemonCaptured] = useState(false);
  const [openModal, setOpenModal] = useState('');
  const [loading, setLoading] = useState(false);
  const [editPokemon, setEditPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState<PokemonData>({
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
  });

  const fetchPokemon = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const response = await fetchPokemonById(id);

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

  const getRandomId = useCallback((min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

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
      setListPokemons,
      imagePokemon,
      isPokemonCaptured,
      setIsPokemonCaptured,
      getRandomId,
      editPokemon,
      setEditPokemon,
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
      setListPokemons,
      imagePokemon,
      isPokemonCaptured,
      setIsPokemonCaptured,
      getRandomId,
      editPokemon,
      setEditPokemon,
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
