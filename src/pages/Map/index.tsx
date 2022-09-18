import React from 'react';

import Sidebar from 'components/Sidebar';

import * as S from './styles';
import SearchPokemon from 'components/SearchPokemon';
import ViewPokemon from 'components/Modals/ViewPokemon';
import { usePokemons } from 'context/Pokemons';

const MapPage: React.FC = () => {
  const { openModal } = usePokemons();

  return (
    <S.MapWrapper>
      <Sidebar />
      <SearchPokemon />

      {openModal === 'viewPokemon' && <ViewPokemon />}
    </S.MapWrapper>
  );
};

export default MapPage;
