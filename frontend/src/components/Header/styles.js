import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    img {
      padding-right: 15px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const MenuItem = styled.div`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-left: 20px;
  a {
    font-weight: bold;
    color: ${props => (props.selected ? '#444' : '#999')};
  }
`;

export const Profile = styled.div`
  margin-right: 20px;
  position: absolute;
  right: 0;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
      padding-bottom: 4px;
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  button {
    border: 0;
    background: none;
    color: #de3b3b;

    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;
