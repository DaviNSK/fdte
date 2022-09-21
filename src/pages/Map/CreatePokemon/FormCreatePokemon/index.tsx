import React, { useCallback, useEffect, useMemo, useState } from 'react';
import makeAnimated from 'react-select/animated';
import toast from 'react-hot-toast';

import Button from 'components/Button';
import Divider from 'components/Divider';
import InputNumber from 'components/InputNumber';
import InputText from 'components/InputText';

import AtackIcon from 'assets/icons/atack.svg';
import DefenseIcon from 'assets/icons/defense.svg';
import SpecialAtack from 'assets/icons/specialAtack.svg';
import SpecialDefense from 'assets/icons/specialDefense.svg';
import Speed from 'assets/icons/speed.svg';

import { pokeTypesOptions } from 'utils/pokeColors';
import getRandomId from 'utils/randomId';

import { usePokemons } from 'context/Pokemons';

import * as S from './styles';

const FormCreatePokemon: React.FC = () => {
  const {
    setPokemons,
    setCurrentPokemon,
    currentPokemon,
    currentPokemonIsCaptured,
    closeModal
  } = usePokemons();
  const animatedComponents = useMemo(() => makeAnimated(), []);
  const [selectedOptions, setSelectedOptions] = useState<SelectedTypes[]>([]);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [hasFirstValidate, setHasFirstValidate] = useState(false);

  const handleInput = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      input: string,
      isNumber?: boolean,
    ) => {
      setCurrentPokemon((prevState) => ({
        ...prevState,
        [input]: isNumber ? Number(event.target.value) : event.target.value,
      }));
    },
    [setCurrentPokemon],
  );

  const handleInputStats = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
      name: string,
    ) => {
      setCurrentPokemon((prevState) => {
        const newState = {
          ...prevState,
        };

        newState.stats[index] = {
          ...newState.stats[index],
          base_stat: Number(event.target.value),
          stat: {
            name: name,
          },
        };

        return newState;
      });
    },
    [setCurrentPokemon],
  );

  const handleInputAbilities = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setCurrentPokemon((prevState) => {
        const newState = {
          ...prevState,
        };

        newState.abilities[index] = {
          ...newState.abilities[index],
          ability: {
            name: event.target.value,
          },
        };
        return newState;
      });
    },
    [setCurrentPokemon],
  );

  const isInvalidForm = useMemo(() => {
    const { name, weight, height, stats, abilities, types } = currentPokemon;

    const genericError = 'Campo obrigatório';

    if (!hasFirstValidate) return;

    const errors = {
      name: name ? '' : genericError,
      weight: weight ? '' : genericError,
      height: height ? '' : genericError,
      hp: stats[0]?.base_stat > 0 ? '' : genericError,
      attack: stats[1]?.base_stat ? '' : genericError,
      defense: stats[2]?.base_stat ? '' : genericError,
      specialAttack: stats[3]?.base_stat ? '' : genericError,
      specialDefense: stats[4]?.base_stat ? '' : genericError,
      speed: stats[5]?.base_stat ? '' : genericError,
      ability1: abilities[0]?.ability.name ? '' : genericError,
      ability2: abilities[1]?.ability.name ? '' : genericError,
      types: types.length > 0 ? '' : genericError,
    };

    setError(errors);

    const hasError = Object.values(errors).find((item) => item !== '');

    return hasError;
  }, [currentPokemon, hasFirstValidate]);

  const inputsBasicsInfos = useMemo(
    () => [
      {
        label: 'HP',
        placeholder: 'HP',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 0, 'hp'),
        defaultValue: currentPokemon.stats[0]?.base_stat,
        error: error.hp,
      },
      {
        label: 'PESO',
        placeholder: 'Peso',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(event, 'weight', true),
        defaultValue: currentPokemon.weight,
        error: error.weight,
      },
      {
        label: 'ALTURA',
        placeholder: 'Altura',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(event, 'height', true),
        defaultValue: currentPokemon.height,
        error: error.height,
      },
    ],
    [handleInput, handleInputStats, error, currentPokemon],
  );

  const inputsAbilities = useMemo(
    () => [
      {
        placeholder: 'habilidade 1',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputAbilities(event, 0),
        error: error.ability1,
        defaultValue: currentPokemon.abilities[0]?.ability.name,
      },
      {
        placeholder: 'habilidade 2',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputAbilities(event, 1),
        error: error.ability2,
        defaultValue: currentPokemon.abilities[1]?.ability.name,
      },
    ],
    [handleInputAbilities, error, currentPokemon],
  );

  const inputsStatistics = useMemo(
    () => [
      {
        icon: DefenseIcon,
        label: 'DEFESA',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 2, 'defense'),
        defaultValue: currentPokemon.stats[2]?.base_stat,
        error: error.defense,
      },
      {
        icon: AtackIcon,
        label: 'ATAQUE',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 1, 'attack'),
        defaultValue: currentPokemon.stats[1]?.base_stat,
        error: error.attack,
      },
      {
        icon: SpecialDefense,
        label: 'DEFESA ESPECIAL',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 4, 'special-defense'),
        defaultValue: currentPokemon.stats[4]?.base_stat,
        error: error.specialDefense,
      },
      {
        icon: SpecialAtack,
        label: 'ATAQUE ESPECIAL',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 3, 'special-attack'),
        defaultValue: currentPokemon.stats[3]?.base_stat,
        error: error.specialAttack,
      },
      {
        icon: Speed,
        label: 'VELOCIDADE',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 5, 'speed'),
        defaultValue: currentPokemon.stats[5]?.base_stat,
        error: error.speed,
      },
    ],
    [handleInputStats, error, currentPokemon],
  );

  const handlePokemonInformation = useCallback(
    (e) => {
      e.preventDefault();

      setHasFirstValidate(true);

      if (isInvalidForm !== undefined) {
        return;
      }

      if (currentPokemon.sprites.front_default === '') {
        toast.error('Por favor, adicione uma imagem ao seu novo pokemon.');
        return;
      }

      let newPokemon = currentPokemon;

      if (currentPokemon.id !== 0) {
        toast.success('Pokemon atualizado com sucesso!');
      } else {
        toast.success('Pokemon criado com sucesso!');

        newPokemon = {
          ...currentPokemon,
          id: getRandomId(1000, 1500),
        };
      }

      setPokemons((prevState) => {
        const newState = [...prevState];

        const findIndex = newState.findIndex(
          (item) => item.id === newPokemon.id,
        );

        if (findIndex !== -1) {
          newState[findIndex] = newPokemon;
        } else {
          newState.push(newPokemon);
        }

        localStorage.setItem('listPokemons', JSON.stringify(newState));

        return newState;
      });

      closeModal();
    },
    [closeModal, currentPokemon, setPokemons, isInvalidForm],
  );

  useEffect(() => {
    if (!selectedOptions.length) return;

    setCurrentPokemon((prevState) => {
      const newState = { ...prevState };

      newState.types = [
        ...selectedOptions.map((item) => ({
          type: {
            name: item.value,
          },
        })),
      ];

      return newState;
    });
  }, [selectedOptions, setCurrentPokemon]);

  const disabledSelect = useCallback(() => {
    if (currentPokemon.types.length >= 2) {
      return true;
    }

    return false;
  }, [currentPokemon]);

  const defaultTypePokemon = useMemo(() => {
    const types = currentPokemon.types.map((item) => ({
      value: item.type.name,
      label: item.type.name,
    }));

    return types.length > 0 ? types : [];
  }, [currentPokemon.types]);

  return (
    <S.Form onSubmit={handlePokemonInformation}>
      <InputText
        error={error.name || ''}
        label="Nome"
        placeholder="Nome"
        type="text"
        defaultValue={currentPokemon.name}
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
          error={item.error}
          defaultValue={item.defaultValue}
        />
      ))}

      <Divider nameSection="TIPO" marginBottom={'12px'} />

      <S.SelectWrapper>
        <S.SelectMulti
          error={error.types}
          components={animatedComponents}
          options={pokeTypesOptions}
          onChange={(item: any) => setSelectedOptions(item)}
          isMulti
          aria-errormessage={error.types}
          isClearable={false}
          isOptionDisabled={disabledSelect}
          isSearchable={false}
          value={defaultTypePokemon}
        />
        {error.types && <S.Error>{error.types}</S.Error>}
      </S.SelectWrapper>

      <Divider nameSection="HABILIDADES" marginBottom={'12px'} />

      {inputsAbilities.map((item, index) => (
        <InputText
          key={index}
          placeholder={item.placeholder}
          onInput={item.onChange}
          type="text"
          error={item.error}
          defaultValue={item.defaultValue}
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
          error={item.error}
          defaultValue={item.defaultValue}
        />
      ))}

      <Button
        onClick={() => handlePokemonInformation}
        className="submit"
        text={!currentPokemonIsCaptured ? 'CRIAR POKEMON' : 'ATUALIZAR POKEMON'}
      />
    </S.Form>
  );
};

export default FormCreatePokemon;

//
// Utils
//

interface SelectedTypes {
  value: string;
  label: string;
}
