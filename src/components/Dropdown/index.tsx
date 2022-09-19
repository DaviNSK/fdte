import React from 'react';

import chevron from 'assets/images/chevronDownBlack.png';

import * as S from './styles';

interface Props {
  label?: string;
  options: {
    value: string;
    text: string;
  }[];
}

const Dropdown: React.FC<Props> = ({ label, options }) => (
  <S.DropdownWrapper>
    {label && <S.Label>{label}</S.Label>}

    <S.DropdownContent>
      <S.Select>
        <S.DropdownOption value="">Selecione o(s) tipo(s)</S.DropdownOption>
        {options &&
          options.map((option, index) => (
            <S.DropdownOption key={index} value={option.value}>
              {option.text}
            </S.DropdownOption>
          ))}
      </S.Select>
      <S.DropdownIcon src={chevron} alt="Chevron" />
    </S.DropdownContent>
  </S.DropdownWrapper>
);

export default Dropdown;
