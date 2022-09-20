import React, { useMemo } from 'react';

import Sidebar from 'components/Sidebar';

import * as S from './styles';
import SearchPokemon from 'components/SearchPokemon';
import ViewPokemon from 'components/Modals/ViewPokemon';
import { usePokemons } from 'context/Pokemons';
import CreatePokemon from 'components/Modals/CreatePokemon';

const MapPage: React.FC = () => {
  const { openModal, pokemonData } = usePokemons();

  const renderModal = useMemo(() => {
    switch (openModal) {
      case 'viewPokemon':
        return <ViewPokemon pokemon={pokemonData} />;
      case 'createPokemon':
        return <CreatePokemon />;

      default:
        return null;
    }
  }, [openModal, pokemonData]);

  return (
    <S.MapWrapper>
      <Sidebar />
      <SearchPokemon />

      {renderModal}
    </S.MapWrapper>
  );
};

export default MapPage;
