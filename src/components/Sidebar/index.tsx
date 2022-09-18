import React, { useEffect, useState } from 'react';

import Button from 'components/Button';

import iconPlus from 'assets/images/plus.png';

import * as S from './styles';
import { PokemonData } from 'context/Pokemons/types';
import { usePokemons } from 'context/Pokemons';

const Sidebar: React.FC = () => {
  const { listPokemons, imagePokemon } = usePokemons();
  const [dataSidebar, setDataSidebar] = useState<DataSidebar[]>([]);

  useEffect(() => {
    setDataSidebar(() => {
      const data = [];

      for (let i = 0; i < MAX_ITENS; i++) {
        data.push({
          data: listPokemons[i] || null,
        });
      }

      return data;
    });
  }, [listPokemons]);

  return (
    <S.SideBarWrapper>
      <S.SideBarList>
        {dataSidebar.map((item, index) => (
          <S.SideBarItem key={index} isEmpty={!item.data}>
            {item.data ? (
              <S.SideBarImage
                src={imagePokemon(item.data)}
                alt={item.data.name}
              />
            ) : (
              '?'
            )}
          </S.SideBarItem>
        ))}
      </S.SideBarList>

      <Button icon={iconPlus} />
    </S.SideBarWrapper>
  );
};

export default Sidebar;

//
// Utils
//

const MAX_ITENS = 6;

interface DataSidebar {
  data: PokemonData | null;
}
