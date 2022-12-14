import React from 'react';

import chevron from 'assets/images/chevronDownBlack.png';

import * as S from './styles';

interface Props {
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  suffix?: string;
  labelIcon?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | string;
  defaultValue?: string | number;
}

const InputNumber: React.FC<Props> = ({
  className,
  label,
  labelIcon,
  placeholder,
  name,
  suffix,
  onInput,
  error,
  defaultValue,
}) => (
  <S.InputNumberWrapper className={className}>
    <S.FlexLabel>
      {labelIcon && (
        <S.LabelIcon>
          <img src={labelIcon} alt="" />
        </S.LabelIcon>
      )}
      {label && <S.Label>{label}</S.Label>}
    </S.FlexLabel>

    <S.InputContent>
      <S.Input
        min={0}
        type="number"
        placeholder={placeholder}
        name={name}
        onChange={onInput}
        error={error}
        value={defaultValue}
      />

      {suffix && <S.InputSuffix>{suffix}</S.InputSuffix>}

      <S.InputActions>
        <S.Arrow src={chevron} className="increase" alt="Mais" />
        <S.Arrow src={chevron} className="decrease" alt="Menos" />
      </S.InputActions>
    </S.InputContent>
    {error && <S.Error>{error}</S.Error>}
  </S.InputNumberWrapper>
);

export default InputNumber;
