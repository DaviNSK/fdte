import { usePokemons } from 'context/Pokemons';
import Close from 'assets/icons/close.svg';
import Camera from 'assets/images/camera.png';
import AtackIcon from 'assets/icons/atack.svg';
import DefenseIcon from 'assets/icons/defense.svg';
import SpecialAtack from 'assets/icons/specialAtack.svg';
import SpecialDefense from 'assets/icons/specialDefense.svg';
import Speed from 'assets/icons/speed.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import makeAnimated from 'react-select/animated';

import * as S from './styles';
import InputText from 'components/InputText';
import InputNumber from 'components/InputNumber';
import Divider from 'components/Divider';
import { pokeTypesOptions } from 'utils/pokeColors';
import Button from 'components/Button';

interface SelectedTypes {
  value: string;
  label: string;
}

const CreatePokemon: React.FC = () => {
  const { setOpenModal, setPokemonData, pokemonData } = usePokemons();
  const animatedComponents = useMemo(() => makeAnimated(), []);
  const [selectedOptions, setSelectedOptions] = useState<SelectedTypes[]>([]);

  const handleInput = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      input: string,
      isNumber?: boolean,
    ) => {
      setPokemonData((prevState) => ({
        ...prevState,
        [input]: isNumber ? Number(event.target.value) : event.target.value,
      }));
    },
    [setPokemonData],
  );

  const handleInputStats = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
      name: string,
    ) => {
      setPokemonData((prevState) => {
        const newState = {
          ...prevState,
          stats: [
            ...prevState.stats.slice(0, index),
            {
              ...prevState.stats[index],
              base_stat: Number(event.target.value),
              stat: {
                name: name,
              },
            },
            ...prevState.stats.slice(index + 1),
          ],
        };
        return newState;
      });
    },
    [setPokemonData],
  );

  const handleInputAbilities = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setPokemonData((prevState) => {
        const newState = {
          ...prevState,
          abilities: [
            ...prevState.abilities.slice(0, index),
            {
              ...prevState.abilities[index],
              ability: {
                name: event.target.value,
              },
            },
            ...prevState.abilities.slice(index + 1),
          ],
        };
        return newState;
      });
    },
    [setPokemonData],
  );

  const inputsBasicsInfos = useMemo(() => {
    return [
      {
        label: 'HP',
        placeholder: 'HP',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 0, 'hp'),
      },
      {
        label: 'PESO',
        placeholder: 'Peso',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(event, 'weight', true),
      },
      {
        label: 'ALTURA',
        placeholder: 'Altura',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(event, 'height', true),
      },
    ];
  }, [handleInput, handleInputStats]);

  useEffect(() => {
    console.log('> pokedata', pokemonData, selectedOptions);
  }, [pokemonData, selectedOptions]);

  const inputsAbilities = useMemo(() => {
    return [
      {
        placeholder: 'habilidade 1',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputAbilities(event, 0),
      },
      {
        placeholder: 'habilidade 2',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputAbilities(event, 1),
      },
    ];
  }, [handleInputAbilities]);

  const inputsStatistics = useMemo(() => {
    return [
      {
        icon: DefenseIcon,
        label: 'DEFESA',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 2, 'defense'),
      },
      {
        icon: AtackIcon,
        label: 'ATAQUE',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 1, 'attack'),
      },
      {
        icon: SpecialDefense,
        label: 'DEFESA ESPECIAL',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 4, 'special-defense'),
      },
      {
        icon: SpecialAtack,
        label: 'ATAQUE ESPECIAL',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 3, 'special-attack'),
      },
      {
        icon: Speed,
        label: 'VELOCIDADE',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 5, 'speed'),
      },
    ];
  }, [handleInputStats]);

  return (
    <S.Container>
      <S.Content>
        <S.Close onClick={() => setOpenModal('')}>
          <img src={Close} alt="" />
        </S.Close>
        <S.CirclePokemon>
          <S.Avatar src={Camera} alt="" />
        </S.CirclePokemon>

        <S.Form>
          <InputText
            label="Nome"
            placeholder="Nome"
            type="text"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event, 'name')
            }
          />

          {inputsBasicsInfos.map((item, index) => (
            <InputNumber
              key={index}
              label={item.label}
              placeholder={item.placeholder}
              onInput={item.onChange}
            />
          ))}

          <Divider nameSection="TIPO" marginBottom={'12px'} />

          <S.SelectMulti
            components={animatedComponents}
            options={pokeTypesOptions}
            onChange={(item: any) => setSelectedOptions(item)}
            isMulti
            isClearable={false}
            isOptionDisabled={() => selectedOptions.length >= 2}
            isSearchable={false}
          />

          <Divider nameSection="HABILIDADES" marginBottom={'12px'} />

          {inputsAbilities.map((item, index) => (
            <InputText
              key={index}
              placeholder={item.placeholder}
              onInput={item.onChange}
              type="text"
            />
          ))}

          <Divider nameSection="ESTATÍSTICAS" marginBottom={'12px'} />

          {inputsStatistics.map((item, index) => (
            <InputNumber
              key={index}
              label={item.label}
              labelIcon={item.icon}
              placeholder="00"
              onInput={item.onChange}
            />
          ))}

          <Button className="submit" text="CRIAR POKEMON" />
        </S.Form>
      </S.Content>
    </S.Container>
  );
};

export default CreatePokemon;
