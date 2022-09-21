import React from 'react';

import SearchPokemon from 'components/SearchPokemon';
import Sidebar from 'components/Sidebar';

import * as S from './styles';

const MapPage: React.FC = () => {
  return (
    <S.MapWrapper>
      <Sidebar />
      <SearchPokemon />
    </S.MapWrapper>
  );
};

export default MapPage;
