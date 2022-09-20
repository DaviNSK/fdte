import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
`;

export const Logo = styled.img`
  margin-bottom: 32px;
`;

export const Start = styled.a`
  width: 124px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff3d71;
  border-radius: 42px;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  text-decoration: none;
`;
