import React from 'react';

import * as S from './styles';

interface Props {
  tooltipIcon: string;
}

const Tooltip: React.FC<Props> = ({ tooltipIcon }) => {
  return (
    <S.Tooltip>
      <S.Content>
        <img src={tooltipIcon} alt="" />
      </S.Content>
    </S.Tooltip>
  );
};

export default Tooltip;
