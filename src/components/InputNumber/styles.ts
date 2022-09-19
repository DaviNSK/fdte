import styled from 'styled-components';

export const InputNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
  width: 100%;
`;

export const FlexLabel = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const LabelIcon = styled.div`
  margin-right: 10px;
  width: 18px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.6;
  text-transform: uppercase;
  color: #2e3a59;
`;

export const InputContent = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  font-weight: 700;
  font-size: 1.6rem;
  padding: 1.2rem 0 1.2rem 0.8rem;
  background: #ffffff;
  border: 2px solid #e4e9f2;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:focus,
  &:active {
    border-color: #598bff;
  }

  &::placeholder {
    color: #c5cef4;
    font-weight: 400;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const InputSuffix = styled.span`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #2e3a59;
`;

export const InputActions = styled.div`
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  height: 46px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ebecf0;
`;

export const Arrow = styled.img`
  transition: all 0.2s;

  &:hover {
    background-color: #c5cef4;
    cursor: pointer;
  }

  &.increase {
    transform: rotate(180deg);
  }
`;
