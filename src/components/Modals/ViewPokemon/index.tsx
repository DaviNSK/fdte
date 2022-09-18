import Badges from 'components/Badges';
import { usePokemons } from 'context/Pokemons';
import { PokeTypes } from 'utils/pokeColors';
import React, { useCallback, useMemo } from 'react';
import PokeBall from 'assets/images/pokeball.png';
import Close from 'assets/icons/close.svg';
import * as S from './styles';

const ViewPokemon: React.FC = () => {
  const { pokemonData, setOpenModal, capturePokemon, imagePokemon } = usePokemons();

  const formatInfosBasic = useMemo(() => {
    if (!pokemonData) return;

    const height = pokemonData?.height * 0.1;
    const weight = pokemonData?.weight / 10;

    return { height, weight };
  }, [pokemonData]);

  const infosBasicPokemons = useMemo(() => {
    return [
      {
        name: 'HP',
        value: `${pokemonData?.stats[0].base_stat}/${pokemonData?.stats[0].base_stat}`,
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
  }, [pokemonData?.stats, formatInfosBasic]);

  const getColor = useCallback((type: string) => {
    return PokeTypes[type].dafaultColor;
  }, []);

  const getTranslatedName = useCallback((type: string) => {
    return PokeTypes[type].name;
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Close onClick={() => setOpenModal('')}>
          <img src={Close} alt="" />
        </S.Close>
        <S.CirclePokemon>
          <S.Avatar src={imagePokemon(pokemonData)} alt="" />
        </S.CirclePokemon>

        <S.ListInfosPokemon>
          <S.PokemonName>{pokemonData?.name}</S.PokemonName>

          <S.InfosBasicPokemons>
            {infosBasicPokemons.map((item, index) => (
              <S.ItemBasic key={index}>
                <S.BasicName>{item.name}</S.BasicName>
                <S.BasicValue>{item.value}</S.BasicValue>
              </S.ItemBasic>
            ))}
          </S.InfosBasicPokemons>

          <S.ListBadges>
            {pokemonData?.types.map((item, index) => (
              <Badges
                key={index}
                color={getColor(item.type.name)}
                label={getTranslatedName(item.type.name)}
              />
            ))}
          </S.ListBadges>

          <S.PokeBall src={PokeBall} alt="" onClick={capturePokemon} />
        </S.ListInfosPokemon>
      </S.Content>
    </S.Container>
  );
};

export default ViewPokemon;
