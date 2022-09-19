import styled from 'styled-components';

interface DividerProps {
  marginBottom?: string;
}

export const NameSection = styled.div<DividerProps>`
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: #2e3a59;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`;

export const Divider = styled.div`
  width: 100%;
  flex: 1;
  background: #c5cee0;
  height: 1px;

  &:first-of-type {
    margin-right: 12px;
  }

  &:last-of-type {
    margin-left: 12px;
  }
`;
