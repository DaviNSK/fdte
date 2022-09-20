import React, { useCallback, useEffect, useMemo, useState } from 'react';
import IconSearch from 'assets/icons/iconSearchTooltip.svg';
import IconLoading from 'assets/icons/iconLoadingTooltip.svg';
import IconError from 'assets/icons/iconErrorTooltip.svg';
import Puppet from 'assets/images/ashFront.png';

import * as S from './styles';
import Tooltip from 'components/Tooltip';
import { usePokemons } from 'context/Pokemons';

const SearchPokemon: React.FC = () => {
  const {
    fetchPokemon,
    listPokemons,
    loading,
    setIsPokemonCaptured,
    getRandomId,
  } = usePokemons();
  const [showTooltip, setShowTooltip] = useState(false);

  const fullListPokemons = useMemo(
    () => listPokemons.length > 6,
    [listPokemons],
  );

  const filteredPokemons = useCallback(
    (id: number | undefined) => {
      const pokemon = listPokemons.find((item) => item.id === id);

      setIsPokemonCaptured(pokemon ? true : false);
    },
    [listPokemons, setIsPokemonCaptured],
  );

  const handleSearchPokemon = useCallback(() => {
    if (fullListPokemons) return;

    const id = getRandomId(1, 898);

    fetchPokemon(id);
    filteredPokemons(id);
  }, [fetchPokemon, getRandomId, fullListPokemons, filteredPokemons]);

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
