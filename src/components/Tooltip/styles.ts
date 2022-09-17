import styled from 'styled-components';

export const Tooltip = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 64px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: absolute;
  top: -70px;
  color: #fefefe;
  z-index: 10;
  background: #f7f9fc;
  border-radius: 4px;
  border: 3px solid #db2c66;

  &::after {
    content: '';
    position: absolute;
    background: #f7f9fc;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-width: 0px 3px 3px 0px;
    border-color: #db2c66;
    transform: rotate(45deg);
    bottom: -9px;
    z-index: -1;
  }
`;
