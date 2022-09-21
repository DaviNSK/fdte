import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { fetchPokemonById } from 'config/Pokemons';

import { PokemonData } from './types';

import { initialCurrentPokemon } from 'utils/initialPokemon';
import ViewPokemon from 'pages/Map/ViewPokemon';
import CreatePokemon from 'pages/Map/CreatePokemon';

export interface ContextValue {
  currentPokemon: PokemonData;
  setCurrentPokemon: Dispatch<SetStateAction<PokemonData>>;
  fetchPokemon: (id: number) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  pokemons: PokemonData[];
  setPokemons: Dispatch<SetStateAction<PokemonData[]>>;
  capturePokemon: () => void;
  currentPokemonIsCaptured: boolean;
  editPokemon: string;
  setEditPokemon: Dispatch<SetStateAction<string>>;
  openModal: string;
  setOpenModal: Dispatch<SetStateAction<string>>;
  closeModal: () => void
  fullListPokemons: boolean
}

export const PokemonsContext = React.createContext<ContextValue | undefined>(
  undefined,
);

export const PokemonsProvider: React.FC = ({ children, ...rest }) => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editPokemon, setEditPokemon] = useState('');
  const [currentPokemon, setCurrentPokemon] =
    useState<PokemonData>(initialCurrentPokemon);
  const [openModal, setOpenModal] = useState('');

  const fetchPokemon = useCallback(
    async (id: number) => {
      setLoading(true);

      try {
        const response = await fetchPokemonById(id);

        setCurrentPokemon(response.data);
        setLoading(false);
        setOpenModal('viewPokemon');
      } catch {
        setLoading(false);
      }
    },
    [setCurrentPokemon, setLoading, setOpenModal],
  );

  const capturePokemon = useCallback(() => {
    if (!currentPokemon) return;

    setPokemons((prevState) => {
      const newState = [...prevState, currentPokemon];

      localStorage.setItem('listPokemons', JSON.stringify(newState));

      return newState;
    });
    setOpenModal('');
  }, [setPokemons, currentPokemon, setOpenModal]);

  useEffect(() => {
    const listPokemonsStorage = localStorage.getItem('listPokemons');

    if (!listPokemonsStorage) return;

    setPokemons(JSON.parse(listPokemonsStorage));
  }, []);

  const currentPokemonIsCaptured = useMemo(
    () => pokemons.find((item) => item.id === currentPokemon.id) !== undefined,
    [currentPokemon.id, pokemons],
  );

  const fullListPokemons = useMemo(() => pokemons.length >= 6, [pokemons]);

  const renderModal = useMemo(() => {
    switch (openModal) {
      case 'viewPokemon':
        return <ViewPokemon />;
      case 'createPokemon':
        return <CreatePokemon />;
      default:
        return null;
    }
  }, [openModal]);

  const closeModal = useCallback(() => {
    setOpenModal('');
    setEditPokemon('');
    setCurrentPokemon(initialCurrentPokemon);
  }, [setOpenModal, setEditPokemon, setCurrentPokemon]);

  const value = useMemo(
    () => ({
      currentPokemon,
      setCurrentPokemon,
      fetchPokemon,
      loading,
      setLoading,
      capturePokemon,
      pokemons,
      setPokemons,
      currentPokemonIsCaptured,
      editPokemon,
      setEditPokemon,
      openModal,
      setOpenModal,
      closeModal,
      fullListPokemons
    }),
    [
      currentPokemon,
      setCurrentPokemon,
      fetchPokemon,
      loading,
      setLoading,
      capturePokemon,
      pokemons,
      setPokemons,
      currentPokemonIsCaptured,
      editPokemon,
      setEditPokemon,
      openModal,
      setOpenModal,
      closeModal,
      fullListPokemons
    ],
  );

  return (
    <PokemonsContext.Provider value={value} {...rest}>
      {renderModal}
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokemons = (): ContextValue => {
  const context = useContext(PokemonsContext);

  if (context === undefined) {
    throw new Error('usePokemons must be used within an PokemonsProvider');
  }

  return context;
};
