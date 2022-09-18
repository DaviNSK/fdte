import styled from 'styled-components';

interface BadgeProps {
  bgColor: string;
}

export const Container = styled.div<BadgeProps>`
  width: 99px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 42px;
  background: ${(props) => props.bgColor};
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;

  &:nth-child(2) {
    margin-left: 11px;
  }
`;
