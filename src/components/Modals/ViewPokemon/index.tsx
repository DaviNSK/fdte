import Badges from 'components/Badges';
import { usePokemons } from 'context/Pokemons';
import { PokeTypes } from 'utils/pokeColors';
import React, { useCallback, useMemo } from 'react';
import PokeBall from 'assets/images/pokeball.png';
import Close from 'assets/icons/close.svg';
import * as S from './styles';
import { PokemonData } from 'context/Pokemons/types';
import Button from 'components/Button';

interface Props {
  pokemon: PokemonData | undefined;
}

const ViewPokemon: React.FC<Props> = ({ pokemon }) => {
  const {
    setOpenModal,
    capturePokemon,
    imagePokemon,
    isPokemonCaptured,
    listPokemons,
    setListPokemons,
  } = usePokemons();

  const formatInfosBasic = useMemo(() => {
    if (!pokemon) return;

    const height = pokemon?.height * 0.1;
    const weight = pokemon?.weight / 10;

    return { height, weight };
  }, [pokemon]);

  const infosBasicPokemons = useMemo(() => {
    return [
      {
        name: 'HP',
        value: `${pokemon?.stats[0].base_stat}/${pokemon?.stats[0].base_stat}`,
      },
      {
        name: 'ALTURA',
        value: `${formatInfosBasic?.height.toFixed(2)} m`,
      },
      {
        name: 'PESO',
        value: `${formatInfosBasic?.weight} kg`,
      },
    ];
  }, [pokemon?.stats, formatInfosBasic]);

  const getColor = useCallback((type: string) => {
    return PokeTypes[type].dafaultColor;
  }, []);

  const getTranslatedName = useCallback((type: string) => {
    return PokeTypes[type].name;
  }, []);

  const deletePokemon = useCallback(() => {
    const newArr = listPokemons.filter((item) => item.id !== pokemon?.id);

    localStorage.setItem('listPokemons', JSON.stringify(newArr));

    setListPokemons(newArr);
    setOpenModal('');
  }, [setOpenModal, listPokemons, pokemon?.id, setListPokemons]);

  return (
    <S.Container>
      <S.Content>
        <S.Close onClick={() => setOpenModal('')}>
          <img src={Close} alt="" />
        </S.Close>
        <S.CirclePokemon>
          <S.Avatar src={imagePokemon(pokemon)} alt="" />
        </S.CirclePokemon>

        <S.ListInfosPokemon>
          <S.PokemonName>{pokemon?.name}</S.PokemonName>

          <S.InfosBasicPokemons>
            {infosBasicPokemons.map((item, index) => (
              <S.ItemBasic key={index}>
                <S.BasicName>{item.name}</S.BasicName>
                <S.BasicValue>{item.value}</S.BasicValue>
              </S.ItemBasic>
            ))}
          </S.InfosBasicPokemons>

          <S.ListBadges>
            {pokemon?.types.map((item, index) => (
              <Badges
                key={index}
                color={getColor(item.type.name)}
                label={getTranslatedName(item.type.name)}
              />
            ))}
          </S.ListBadges>

          {isPokemonCaptured ? (
            <Button
              className="release-pokemon"
              text="Liberar Pokemon"
              onClick={deletePokemon}
            />
          ) : (
            <S.PokeBall src={PokeBall} alt="" onClick={capturePokemon} />
          )}
        </S.ListInfosPokemon>
      </S.Content>
    </S.Container>
  );
};

export default ViewPokemon;
