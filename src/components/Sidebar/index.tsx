import React, { useCallback, useMemo } from 'react';

import { usePokemons } from 'context/Pokemons';

import Button from 'components/Button';

import iconPlus from 'assets/images/plus.png';

import pokemonImage from 'utils/pokemonImage';
import { initialCurrentPokemon } from 'utils/initialPokemon';

import * as S from './styles';

const Sidebar: React.FC = () => {
  const { pokemons, setCurrentPokemon, setOpenModal, fullListPokemons } = usePokemons();

  const dataSidebar = useMemo(() => {
    const data = [];

    for (let i = 0; i < MAX_ITENS; i++) {
      data.push({
        data: pokemons[i] || null,
      });
    }

    return data;
  }, [pokemons]);

  const filteredPokemons = useCallback(
    (pokemonIndex: number) => {
      setCurrentPokemon(pokemons[pokemonIndex]);
      setOpenModal('viewPokemon');
    },
    [pokemons, setCurrentPokemon, setOpenModal],
  );

  return (
    <S.SideBarWrapper>
      <S.SideBarList>
        {dataSidebar.map((item, index) => (
          <S.SideBarItem
            key={index}
            isEmpty={!item.data}
            onClick={() => filteredPokemons(index)}>
            {item.data ? (
              <S.SideBarImage
                src={pokemonImage(item.data)}
                alt={item.data.name}
              />
            ) : (
              '?'
            )}
          </S.SideBarItem>
        ))}
      </S.SideBarList>

      <Button
        icon={iconPlus}
        disabled={fullListPokemons}
        onClick={() => {
          setCurrentPokemon(initialCurrentPokemon);
          setOpenModal('createPokemon');
        }}
      />
    </S.SideBarWrapper>
  );
};

export default Sidebar;

//
// Utils
//

const MAX_ITENS = 6;
