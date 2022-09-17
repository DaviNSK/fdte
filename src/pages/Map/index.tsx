import React from "react";

import Sidebar from "components/Sidebar";

import * as S from "./styled";

const MapPage: React.FC = () => (
  <S.MapWrapper className="map">
    <Sidebar />

  </S.MapWrapper>
);

export default MapPage;
