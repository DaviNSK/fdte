import Button from 'components/Button';
import Divider from 'components/Divider';
import InputNumber from 'components/InputNumber';
import InputText from 'components/InputText';
import { usePokemons } from 'context/Pokemons';
import { pokeTypesOptions } from 'utils/pokeColors';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import makeAnimated from 'react-select/animated';

import AtackIcon from 'assets/icons/atack.svg';
import DefenseIcon from 'assets/icons/defense.svg';
import SpecialAtack from 'assets/icons/specialAtack.svg';
import SpecialDefense from 'assets/icons/specialDefense.svg';
import Speed from 'assets/icons/speed.svg';

import * as S from './styles';
import toast from 'react-hot-toast';

interface SelectedTypes {
  value: string;
  label: string;
}

const FormCreatePokemon: React.FC = () => {
  const { setListPokemons, setPokemonData, pokemonData, getRandomId, loading, setLoading, setOpenModal } =
    usePokemons();
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

  const isInvalidForm = useMemo(() => {
    const { name, weight, height, stats, abilities, types } = pokemonData;

    const genericError = 'Campo obrigatório';

    if (!hasFirstValidate) return;

    const errors = {
      name: name ? '' : genericError,
      weight: weight ? '' : genericError,
      height: height ? '' : genericError,
      hp: stats[0].base_stat > 0 ? '' : genericError,
      attack: stats[1]?.base_stat ? '' : genericError,
      defense: stats[2]?.base_stat ? '' : genericError,
      specialAttack: stats[3]?.base_stat ? '' : genericError,
      specialDefense: stats[4]?.base_stat ? '' : genericError,
      speed: stats[5]?.base_stat ? '' : genericError,
      ability1: abilities[0].ability.name ? '' : genericError,
      ability2: abilities[1] && abilities[1].ability.name ? '' : genericError,
      types: types.length > 0 ? '' : genericError,
    };

    console.log(errors, 'errors');

    setError(errors);

    const hasError = Object.values(errors).find((item) => item !== '');

    return hasError;
  }, [pokemonData, hasFirstValidate]);

  const inputsBasicsInfos = useMemo(() => {
    return [
      {
        label: 'HP',
        placeholder: 'HP',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 0, 'hp'),
        error: error.hp,
      },
      {
        label: 'PESO',
        placeholder: 'Peso',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(event, 'weight', true),
        error: error.weight,
      },
      {
        label: 'ALTURA',
        placeholder: 'Altura',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(event, 'height', true),
        error: error.height,
      },
    ];
  }, [handleInput, handleInputStats, error]);

  useEffect(() => {
    console.log('> pokedata', pokemonData, selectedOptions);
  }, [pokemonData, selectedOptions]);

  const inputsAbilities = useMemo(() => {
    return [
      {
        placeholder: 'habilidade 1',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputAbilities(event, 0),
        error: error.ability1,
      },
      {
        placeholder: 'habilidade 2',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputAbilities(event, 1),
        error: error.ability2,
      },
    ];
  }, [handleInputAbilities, error]);

  const inputsStatistics = useMemo(() => {
    return [
      {
        icon: DefenseIcon,
        label: 'DEFESA',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 2, 'defense'),
        error: error.defense,
      },
      {
        icon: AtackIcon,
        label: 'ATAQUE',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 1, 'attack'),
        error: error.attack,
      },
      {
        icon: SpecialDefense,
        label: 'DEFESA ESPECIAL',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 4, 'special-defense'),
        error: error.specialDefense,
      },
      {
        icon: SpecialAtack,
        label: 'ATAQUE ESPECIAL',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 3, 'special-attack'),
        error: error.specialAttack,
      },
      {
        icon: Speed,
        label: 'VELOCIDADE',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputStats(event, 5, 'speed'),
        error: error.speed,
      },
    ];
  }, [handleInputStats, error]);

  const createPokemon = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);

      setHasFirstValidate(true);

      if (isInvalidForm !== undefined || !hasFirstValidate) {
        setLoading(false);
        return;
      } 

      if (pokemonData.sprites.front_default === '') {
        toast.error('Por favor, adicione uma imagem ao seu novo pokemon.');
        setLoading(false);
        return;
      }

      setTimeout(() => {
        toast.success('Pokemon criado com sucesso!');

        const id = getRandomId(1000, 1500);

        setPokemonData((prevState) => ({
          ...prevState,
          id: id,
        }));

        setListPokemons((prevState) => {
          const newState = [...prevState, pokemonData];

          localStorage.setItem('listPokemons', JSON.stringify(newState));

          return newState;
        });

        setLoading(false);
        setOpenModal('')
      }, 1000);
    },
    [
      pokemonData,
      setListPokemons,
      getRandomId,
      setPokemonData,
      isInvalidForm,
      hasFirstValidate,
      setLoading,
      setOpenModal
    ],
  );

  useEffect(() => {
    setPokemonData((prevState) => {
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
  }, [selectedOptions, setPokemonData]);

  return (
    <S.Form onSubmit={createPokemon}>
      <InputText
        error={error.name || ''}
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
          error={item.error}
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
          isOptionDisabled={() => selectedOptions.length >= 2}
          isSearchable={false}
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
        />
      ))}

      <Button
        onClick={() => createPokemon}
        className="submit"
        text={loading ? 'LOADING ...' : "CRIAR POKEMON"}
      />
    </S.Form>
  );
};

export default FormCreatePokemon;
