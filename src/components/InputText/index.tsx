import React from 'react';

import * as S from './styles';

interface Props {
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  type: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | string;
  defaultValue?: string;
}

const InputText: React.FC<Props> = ({
  className,
  label,
  type,
  placeholder,
  name,
  onInput,
  error,
  defaultValue
}) => {
  return (
    <S.InputTextWrapper className={className}>
      {label && <S.Label>{label}</S.Label>}

      <S.Input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onInput}
        error={error}
        value={defaultValue}
      />

      {error && <S.Error>{error}</S.Error>}
    </S.InputTextWrapper>
  );
};


export default InputText;
