import React, { useCallback, useState } from 'react';
import Compress from 'react-image-file-resizer';

import { usePokemons } from 'context/Pokemons';
import FormCreatePokemon from './FormCreatePokemon';

import Plus from 'assets/images/plus.png';
import Close from 'assets/icons/close.svg';
import Camera from 'assets/images/camera.png';

import * as S from './styles';
import toast from 'react-hot-toast';

const CreatePokemon: React.FC = () => {
  const { setCurrentPokemon, currentPokemon, closeModal} =
    usePokemons();
  const [imageLodaded, setImageLoaded] = useState<
    string | Blob | File | ProgressEvent<FileReader>
  >();

  const changeHandler = useCallback(
    (event) => {
      const typeImage = event.target.files[0].type;

      if (typeImage === 'image/png' || typeImage === 'image/jpeg') {
        if (event.target.files && event.target.files.length > 0) {
          Compress.imageFileResizer(
            event.target.files[0],
            480,
            480,
            'JPEG',
            70,
            0,
            (uri) => {
              setImageLoaded(uri);
              setCurrentPokemon((prevState) => ({
                ...prevState,
                sprites: {
                  front_default: uri.toString(),
                  other: {
                    'official-artwork': {
                      front_default: uri.toString(),
                    },
                  },
                },
              }));
            },
            'base64',
          );
        }
      } else {
        toast.error('Inserir Imagem Com Formato JPG ou PNG');
      }
    },
    [setCurrentPokemon, setImageLoaded],
  );

  return (
    <S.Container>
      <S.Content>
        <S.Close
          onClick={closeModal}>
          <img src={Close} alt="" />
        </S.Close>
        <S.CirclePokemon>
          <S.Avatar
            src={
              imageLodaded
                ? imageLodaded.toString() ||
                  currentPokemon.sprites.other['official-artwork'].front_default
                : Camera
            }
            alt=""
          />
          {!imageLodaded && (
            <S.ButtonPlus>
              <img className="icon-plus" src={Plus} alt="" />
              <S.InputFile
                type="file"
                id="file"
                onChange={changeHandler}
                accept="image/png, image/jpeg"
              />
            </S.ButtonPlus>
          )}
        </S.CirclePokemon>

        <FormCreatePokemon />
      </S.Content>
    </S.Container>
  );
};

export default CreatePokemon;
