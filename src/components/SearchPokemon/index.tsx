import React, { useCallback, useState } from 'react';
import IconSearch from 'assets/icons/iconSearchTooltip.svg';
import IconLoading from 'assets/icons/iconLoadingTooltip.svg';
import Puppet from 'assets/images/ashFront.png';

import * as S from './styles';
import Tooltip from 'components/Tooltip';
import { usePokemons } from 'context/pokemons';

const SearchPokemon: React.FC = () => {
  const { fetchPokemon, loading } = usePokemons();
  const [showTooltip, setShowTooltip] = useState(false);

  const getRandomId = useCallback((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  return (
    <S.Search
      onClick={() => fetchPokemon(getRandomId(1, 807))}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      {showTooltip && (
        <Tooltip tooltipIcon={loading ? IconLoading : IconSearch} />
      )}
      <img src={Puppet} alt="" />
    </S.Search>
  );
};

export default SearchPokemon;
