import React, { useCallback, useMemo, useState } from 'react';

import Tooltip from 'components/Tooltip';

import { usePokemons } from 'context/Pokemons';

import getRandomId from 'utils/randomId';

import IconSearch from 'assets/icons/iconSearchTooltip.svg';
import IconLoading from 'assets/icons/iconLoadingTooltip.svg';
import IconError from 'assets/icons/iconErrorTooltip.svg';
import Puppet from 'assets/images/ashFront.png';

import * as S from './styles';

const SearchPokemon: React.FC = () => {
  const { fetchPokemon, loading, fullListPokemons } = usePokemons();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSearchPokemon = useCallback(() => {
    if (fullListPokemons) return;

    const id = getRandomId(1, 898);

    fetchPokemon(id);
  }, [fetchPokemon, fullListPokemons]);

  const showIconTooltip = useMemo(() => {
    if (loading) {
      return IconLoading;
    }

    if (fullListPokemons) {
      return IconError;
    }

    return IconSearch;
  }, [loading, fullListPokemons]);

  return (
    <S.Search
      onClick={handleSearchPokemon}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      {showTooltip && <Tooltip tooltipIcon={showIconTooltip} />}

      <img src={Puppet} alt="" />
    </S.Search>
  );
};

export default SearchPokemon;
