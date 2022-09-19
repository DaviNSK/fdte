import styled from 'styled-components';
import Select from 'react-select';

export const Form = styled.form`
  width: 100%;
  background: #f7f9fc;
  border-radius: 24px 24px 0px 0px;
  min-height: 100%;
  margin-top: 150px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 160px 24px 68px;

  .submit {
    width: 221px;
    height: 53px;
    margin-top: 60px;
  }
`;

export const SelectMulti = styled(Select)`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;

  .css-1okebmr-indicatorSeparator {
    display: none;
  }

  .css-1pahdxg-control {
    box-shadow: none;
    border: 2px solid #e4e9f2;

    &:hover {
      border: 2px solid #e4e9f2;
    }
  }

  .css-1s2u09g-control {
    border: 2px solid #e4e9f2;
    border-radius: 3px;

    &:hover {
      border: 2px solid #e4e9f2;
    }
  }

  .css-1rhbuit-multiValue {
    background: #e4e9f2;
    border-radius: 3px;
    margin: 4px 4px 0 0;
    font-size: 12px;
    line-height: 16px;
    color: #42526e;
  }
`;
