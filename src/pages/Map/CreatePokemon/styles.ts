import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
  background-blend-mode: multiply;
  position: fixed;
  z-index: 10;
`;

export const Content = styled.div`
  width: 360px;
  height: 559px;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  overflow-y: auto;
  position: relative;
  border-radius: 8px;

  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar {
    display: none;
  }

  @media(max-width: 1023px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
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

export const ButtonPlus = styled.button`
  width: 38px;
  height: 38px;
  background: #ff3d71;
  border: 3px solid #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 27%;
  bottom: 27%;

  .icon-plus {
    width: 16px;
  }
`;

export const InputFile = styled.input`
  height: 100%;
  width: 100%;
  position: absolute;
  opacity: 0;
`;
