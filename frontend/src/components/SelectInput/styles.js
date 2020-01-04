import styled from 'styled-components';

export const SelectInputWrapper = styled.div`
  padding: 0 0 15px 0;

  .selectinput {
    height: 45px;
    border-radius: 4px;
    color: #999;
    margin-bottom: 20px;

    div[class*='-control'] {
      height: 45px;
    }

    div[class*='-control'] > div:first-of-type {
      width: 100%;
      position: absolute;
    }
  }
`;
