import Badges from 'components/Badges';
import { usePokemons } from 'context/Pokemons';
import { PokeTypes } from 'utils/pokeColors';
import React, { useCallback, useMemo } from 'react';
import PokeBall from 'assets/images/pokeball.png';
import AtackIcon from 'assets/icons/atack.svg';
import DefenseIcon from 'assets/icons/defense.svg';
import SpecialAtack from 'assets/icons/specialAtack.svg';
import SpecialDefense from 'assets/icons/specialDefense.svg';
import Speed from 'assets/icons/speed.svg';
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

  const statisticsPokemons = useMemo(() => {
    const stats = pokemon?.stats;
    if (!stats) return;

    return [
      {
        icon: DefenseIcon,
        name: 'defesa',
        value: stats[2].base_stat,
      },
      {
        icon: AtackIcon,
        name: 'ataque',
        value: stats[1].base_stat,
      },
      {
        icon: SpecialDefense,
        name: 'defesa especial',
        value: stats[4].base_stat,
      },
      {
        icon: SpecialAtack,
        name: 'ataque especial',
        value: stats[3].base_stat,
      },
      {
        icon: Speed,
        name: 'velocidade',
        value: stats[5].base_stat,
      },
    ];
  }, [pokemon?.stats]);

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

          <S.NameSection>
            <S.Divider /> TIPO
            <S.Divider />
          </S.NameSection>

          <S.ListFlex>
            {pokemon?.types.map((item, index) => (
              <Badges
                key={index}
                color={getColor(item.type.name)}
                label={getTranslatedName(item.type.name)}
              />
            ))}
          </S.ListFlex>

          <S.NameSection>
            <S.Divider /> HABILIDADES
            <S.Divider />
          </S.NameSection>

          <S.ListFlex>
            {pokemon?.abilities.map((item, index) => (
              <S.Abilities key={index}>
                {item.ability.name}
                {index < 1 ? ',' : ''}
              </S.Abilities>
            ))}
          </S.ListFlex>

          {isPokemonCaptured && (
            <>
              <S.NameSection>
                <S.Divider /> ESTATÍSTICAS
                <S.Divider />
              </S.NameSection>

              {statisticsPokemons?.map((item, index) => (
                <S.Statistics key={index}>
                  <S.StatisticsIcon>
                    <img src={item.icon} alt="" />
                  </S.StatisticsIcon>
                  <S.StatisticsName>{item.name}</S.StatisticsName>
                  <S.StatisticsValue>{item.value}</S.StatisticsValue>
                </S.Statistics>
              ))}
            </>
          )}
        </S.ListInfosPokemon>
      </S.Content>
      {isPokemonCaptured ? (
        <Button
          className="release-pokemon"
          text="Liberar Pokemon"
          onClick={deletePokemon}
        />
      ) : (
        <S.PokeBall src={PokeBall} alt="" onClick={capturePokemon} />
      )}
    </S.Container>
  );
};

export default ViewPokemon;
