import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Badges from 'components/Badges';
import InputText from 'components/InputText';
import Button from 'components/Button';
import Divider from 'components/Divider';

import PokeBall from 'assets/images/pokeball.png';
import AtackIcon from 'assets/icons/atack.svg';
import DefenseIcon from 'assets/icons/defense.svg';
import SpecialAtack from 'assets/icons/specialAtack.svg';
import SpecialDefense from 'assets/icons/specialDefense.svg';
import Speed from 'assets/icons/speed.svg';
import Close from 'assets/icons/close.svg';
import IconCheck from 'assets/icons/iconCheck.svg';
import IconEdit from 'assets/icons/iconEdit.svg';

import pokemonImage from 'utils/pokemonImage';
import { pokeTypes } from 'utils/pokeColors';

import { usePokemons } from 'context/Pokemons';

import * as S from './styles';

const ViewPokemon: React.FC = () => {
  const {
    capturePokemon,
    currentPokemonIsCaptured,
    pokemons,
    setPokemons,
    editPokemon,
    setEditPokemon,
    setCurrentPokemon,
    currentPokemon,
    setOpenModal,
    closeModal
  } = usePokemons();
  const [namePokemon, setNamePokemon] = useState(currentPokemon?.name);

  const formatInfosBasic = useMemo(() => {
    const data = { height: 0, weight: 0 };

    if (!currentPokemon) return data;

    data.height = currentPokemon.height * 0.1;
    data.weight = currentPokemon.weight / 10;

    return data;
  }, [currentPokemon]);

  const infosBasicPokemons = useMemo(() => {
    return [
      {
        name: 'HP',
        value: `${currentPokemon?.stats[0].base_stat}/${currentPokemon?.stats[0].base_stat}`,
      },
      {
        name: 'ALTURA',
        value: `${formatInfosBasic.height.toFixed(2)} m`,
      },
      {
        name: 'PESO',
        value: `${formatInfosBasic.weight} kg`,
      },
    ];
  }, [currentPokemon?.stats, formatInfosBasic]);

  const statisticsPokemons = useMemo(() => {
    const stats = currentPokemon?.stats;

    if (!stats) return;

    return [
      {
        icon: DefenseIcon,
        name: 'defesa',
        value: stats[2]?.base_stat,
      },
      {
        icon: AtackIcon,
        name: 'ataque',
        value: stats[1]?.base_stat,
      },
      {
        icon: SpecialDefense,
        name: 'defesa especial',
        value: stats[4]?.base_stat,
      },
      {
        icon: SpecialAtack,
        name: 'ataque especial',
        value: stats[3]?.base_stat,
      },
      {
        icon: Speed,
        name: 'velocidade',
        value: stats[5]?.base_stat,
      },
    ];
  }, [currentPokemon?.stats]);

  const getColor = useCallback((type: string) => {
    return pokeTypes[type]?.dafaultColor;
  }, []);

  const getTranslatedName = useCallback((type: string) => {
    return pokeTypes[type]?.name;
  }, []);

  const deletePokemon = useCallback(() => {
    const newArr = pokemons.filter((item) => item.id !== currentPokemon?.id);

    localStorage.setItem('listPokemons', JSON.stringify(newArr));

    setPokemons(newArr);
    closeModal()
  }, [closeModal, pokemons, currentPokemon?.id, setPokemons]);

  const editNamePokemon = useCallback(() => {
    if (!namePokemon) return;

    const newArr = pokemons.map((item) => {
      if (item.id === currentPokemon?.id) {
        return {
          ...item,
          name: namePokemon,
        };
      }

      return item;
    });
    setPokemons(newArr);

    localStorage.setItem('listPokemons', JSON.stringify(newArr));

    setCurrentPokemon((prevState) => {
      return {
        ...prevState,
        name: namePokemon || '',
      };
    });

    setEditPokemon('');

    return newArr;
  }, [
    pokemons,
    namePokemon,
    currentPokemon?.id,
    setEditPokemon,
    setCurrentPokemon,
    setPokemons,
  ]);

  useEffect(() => {
    if (editPokemon === 'isCreated') {
      setOpenModal('createPokemon');
    }
  }, [setOpenModal, editPokemon]);

  return (
    <S.Container>
      <S.Content>
        <S.Close onClick={closeModal}>
          <img src={Close} alt="" />
        </S.Close>
        <S.CirclePokemon>
          <S.Avatar src={pokemonImage(currentPokemon)} alt="" />
        </S.CirclePokemon>

        <S.ListInfosPokemon>
          {editPokemon !== 'isPokeApi' ? (
            <S.PokemonName>
              {currentPokemon?.name}{' '}
              {currentPokemon && currentPokemonIsCaptured && (
                <S.IconEdit
                  onClick={() =>
                    setEditPokemon(
                      currentPokemon?.id < 999 ? 'isPokeApi' : 'isCreated',
                    )
                  }
                  src={IconEdit}
                  alt=""
                />
              )}
            </S.PokemonName>
          ) : (
            <S.EditPokeName>
              <InputText
                className="input-edit"
                type="text"
                defaultValue={namePokemon}
                onInput={(e) => setNamePokemon(e.target.value)}
              />
              <S.ButtonEdit onClick={editNamePokemon}>
                <img src={IconCheck} alt="" />
              </S.ButtonEdit>

              <S.ButtonEdit onClick={() => setEditPokemon('')}>
                <img className="icon-button-close" src={Close} alt="" />
              </S.ButtonEdit>
            </S.EditPokeName>
          )}

          <S.InfosBasicPokemons>
            {infosBasicPokemons.map((item, index) => (
              <S.ItemBasic key={index}>
                <S.BasicName>{item.name}</S.BasicName>
                <S.BasicValue>{item.value}</S.BasicValue>
              </S.ItemBasic>
            ))}
          </S.InfosBasicPokemons>

          <Divider nameSection="TIPO" />

          <S.ListFlex>
            {currentPokemon?.types.map((item, index) => (
              <Badges
                key={index}
                color={getColor(item.type.name)}
                label={getTranslatedName(item.type.name)}
              />
            ))}
          </S.ListFlex>

          <Divider nameSection="HABILIDADES" />

          <S.ListFlex>
            {currentPokemon?.abilities.map((item, index) => (
              <S.Abilities key={index}>
                {item.ability.name}
                {index < 1 ? ',' : ''}
              </S.Abilities>
            ))}
          </S.ListFlex>

          {currentPokemonIsCaptured && (
            <>
              <Divider nameSection="ESTATÍSTICAS" />

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
      {currentPokemonIsCaptured ? (
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
