import React from 'react';

import * as S from './styles';

interface Props {
  nameSection: string;
  marginBottom?: string;
}

const Divider: React.FC<Props> = ({ nameSection, marginBottom }) => {
  return (
    <S.NameSection marginBottom={marginBottom}>
      <S.Divider /> {nameSection}
      <S.Divider />
    </S.NameSection>
  );
};

export default Divider;
