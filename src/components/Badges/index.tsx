import React from 'react';

import * as S from './styles';

interface Props {
  color: string;
  label: string;
}

const Badges: React.FC<Props> = ({ color, label }) => {
  return <S.Container bgColor={color}>{label}</S.Container>;
};

export default Badges;
