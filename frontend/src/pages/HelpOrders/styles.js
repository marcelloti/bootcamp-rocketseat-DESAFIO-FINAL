import styled from 'styled-components';

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
  }
  .apagarLink {
    color: #de3b3b;
  }
  .centerColumn {
    text-align: center;
  }
  tr {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    td {
      width: 20%;
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

  .openModalBtn {
    color: #4d85ee;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
  }
`;
