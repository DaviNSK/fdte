import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
  background-blend-mode: multiply;
  position: relative;
`;

export const Content = styled.div`
  width: 360px;
  height: 559px;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  overflow: hidden;
  position: relative;
`;

export const Close = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 12px;
  top: 12px;
  background: #f7f9fc;
  border-radius: 50%;
  border: 2px solid #8f9bb3;
  cursor: pointer;
`;

export const CirclePokemon = styled.div`
  background: #f7f9fc;
  width: 247px;
  height: 247px;
  border: 4px solid #00d68f;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  top: 32px;
  left: 1px;
  right: 1px;
  position: absolute;
`;

export const Avatar = styled.img`
  width: 85px;
  height: 75px;
  object-fit: cover;
`;

export const ListInfosPokemon = styled.div`
  width: 100%;
  background: #f7f9fc;
  border-radius: 24px 24px 0px 0px;
  min-height: 100%;
  margin-top: 150px;
  padding: 160px 24px 0px;

  .release-pokemon {
    position: absolute;
    left: 1px;
    right: 1px;
    height: 56px;
    margin: 0 auto;
    bottom: 58px;
    width: 221px;
  }
`;

export const PokemonName = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #2e3a59;
  text-transform: uppercase;
`;

export const InfosBasicPokemons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c5cee0;
  padding: 36px 0px 42px;
  margin-bottom: 41px;
`;

export const ItemBasic = styled.div`
  border-right: 1px solid #c5cee0;
  color: #2e3a59;
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:last-of-type {
    border-right: 0;
  }
`;

export const BasicName = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const BasicValue = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;

export const ListBadges = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PokeBall = styled.img`
  position: absolute;
  left: 1px;
  right: 1px;
  margin: 0 auto;
  bottom: 32px;
  width: 115px;
  height: 115px;
  cursor: pointer;
`;
