import React from "react";
import LogoPokemon from "assets/images/pokemonLogo.png"
import * as S from "./styles";

const HomePage: React.FC = () => (
  <S.HomeWrapper>
    <S.Logo src={LogoPokemon} alt="" />
    <S.Start href="/map">start</S.Start>
  </S.HomeWrapper>
);

export default HomePage;
