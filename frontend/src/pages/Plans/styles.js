import styled from 'styled-components';
import { darken } from 'polished';
import searchImg from '~/assets/search-24px.png';

export const Container = styled.div`
  max-width: 1100px;
  margin: 50px auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Content = styled.div`
  display: flex;

  button {
    border: 0;
    background: none;
  }

  strong {
    color: #fff;
    font-size: 24px;
    margin: 0 15px;
  }

  border-radius: 4px;
  padding: 30px;
  background: #fff;
`;

export const ActionDiv = styled.div`
  display: flex;

  button {
    display: flex;
    border: 0;
    background: #ee4d64;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bold;
    width: 142px;
    height: 36px;
    padding: 10px;
    border-radius: 3px;
    align-items: center;
    justify-content: space-around;
    margin-right: 16px;

    &:hover {
      background: ${darken(0.03, '#EE4D64')};
    }
  }

  input {
    font-family: 'Roboto', sans-serif;
    border-radius: 4px;
    width: 237px;
    height: 36px;
    background: #fff url(${searchImg}) no-repeat 10px center;
    padding-left: 32px;
    border: 1px solid #ddd;
    color: #999;
  }
`;

export const PageTitle = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;

export const Table = styled.table`
  border-collapse: collapse;

  th {
    text-align: left;
  }
  width: 100%;
  .editarLink {
    color: #4d85ee;
    margin-right: 10px;
  }
  .apagarLink {
    color: #de3b3b;
    display: contents;
  }
  .centerColumn {
    text-align: center;
  }
  tr {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    td {
      width: 30%;
    }
    td:last-child {
      text-align: right;
    }
  }
  tr:not(:first-child) {
    line-height: 54px;
    border-bottom: 1px solid #eeeeee;
    margin-top: 20px;
    color: #666666;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }
  tr:last-child {
    border: 0 !important;
  }

  a:first-child {
    margin-right: 20px;
  }
`;
