import React from 'react';

import Sidebar from 'components/Sidebar';

import * as S from './styles';
import SearchPokemon from 'components/SearchPokemon';

const MapPage: React.FC = () => {
  return (
    <S.MapWrapper>
      <Sidebar />
      <SearchPokemon />
    </S.MapWrapper>
  );
};

export default MapPage;
