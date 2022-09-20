import React from 'react';

import * as S from './styles';
interface Props {
  text?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<Props> = ({ text, icon, onClick, className }) => (
  <S.ButtonWrapper
    className={`${icon ? 'icon' : ''} ${className}`}
    onClick={onClick}>
    {icon ? <S.Icon src={icon} /> : <S.Text>{text}</S.Text>}
  </S.ButtonWrapper>
);

export default Button;
