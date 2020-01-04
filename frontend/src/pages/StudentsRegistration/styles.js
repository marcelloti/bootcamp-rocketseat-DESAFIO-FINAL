import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1100px;
  margin: 50px auto;

  #submitButton {
    display: none;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 30px;
  background: #fff;
  align-items: stretch;

  button {
    border: 0;
    background: none;
  }

  label {
    display: block;
  }

  input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding-left: 10px;
    color: #999;
    margin-bottom: 20px;
  }
`;

export const StudentData = styled.div`
  display: flex;
  align-items: flex-start;

  div {
    flex: 1;
  }

  div:not(:first-child) {
    margin: 0px 0px 0px 15px;
  }

  input {
    width: 100%;
  }

  span {
    margin-bottom: 20px;
    display: block;
    color: #ff5500;
  }
`;

export const ActionDiv = styled.div`
  display: flex;

  button {
    display: flex;
    border: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bold;
    width: 112px;
    height: 36px;
    padding: 10px;
    border-radius: 3px;
    align-items: center;
    justify-content: space-around;
    margin-right: 16px;
    color: #fff;
  }

  .cadastrarBtn {
    background: #ee4d64;
    &:hover {
      background: ${darken(0.03, '#EE4D64')};
    }
  }

  .voltarBtn {
    background: #cccccc;
    &:hover {
      background: ${darken(0.03, '#cccccc')};
    }
  }
`;

export const PageTitle = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;
