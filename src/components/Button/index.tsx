import React from 'react';

import * as S from './styles';
interface Props {
  text?: string;
  icon?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, icon, onClick }) => (
  <S.ButtonWrapper className={`${icon ? 'icon' : ''}`} onClick={onClick}>
    {icon ? <S.Icon src={icon} /> : <S.Text>{text}</S.Text>}
  </S.ButtonWrapper>
);

export default Button;
