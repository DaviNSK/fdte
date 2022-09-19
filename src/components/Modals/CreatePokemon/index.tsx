import React from 'react';

import { usePokemons } from 'context/Pokemons';
import FormCreatePokemon from 'components/FormCreatePokemon';

import Close from 'assets/icons/close.svg';
import Camera from 'assets/images/camera.png';

import * as S from './styles';

const CreatePokemon: React.FC = () => {
  const { setOpenModal } = usePokemons();

  return (
    <S.Container>
      <S.Content>
        <S.Close onClick={() => setOpenModal('')}>
          <img src={Close} alt="" />
        </S.Close>
        <S.CirclePokemon>
          <S.Avatar src={Camera} alt="" />
        </S.CirclePokemon>

        <FormCreatePokemon />
      </S.Content>
    </S.Container>
  );
};

export default CreatePokemon;
