import React, { useCallback, useEffect, useMemo, useState } from 'react';
import IconSearch from 'assets/icons/iconSearchTooltip.svg';
import IconLoading from 'assets/icons/iconLoadingTooltip.svg';
import IconError from 'assets/icons/iconErrorTooltip.svg';
import Puppet from 'assets/images/ashFront.png';

import * as S from './styles';
import Tooltip from 'components/Tooltip';
import { usePokemons } from 'context/Pokemons';

const SearchPokemon: React.FC = () => {
  const { fetchPokemon, listPokemons, loading, setIsPokemonCaptured } =
    usePokemons();
  const [showTooltip, setShowTooltip] = useState(false);
  const [fullListPokemons, setFullListPokemons] = useState(false);

  const getRandomId = useCallback((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const verifyListPokemons = useCallback(() => {
    if (listPokemons.length >= 6) {
      setFullListPokemons(true);
      return;
    }
    setFullListPokemons(false);
  }, [listPokemons, setFullListPokemons]);

  useEffect(() => {
    verifyListPokemons();
  }, [verifyListPokemons]);

  const filteredPokemons = useCallback(
    (id: number | undefined) => {
      const list = listPokemons.filter((item) => item.id === id);

      if (list.length > 0) {
        setIsPokemonCaptured(true);
        return;
      }
      setIsPokemonCaptured(false);
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
