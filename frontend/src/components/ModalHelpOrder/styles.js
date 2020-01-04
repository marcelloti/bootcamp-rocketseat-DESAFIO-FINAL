import styled from 'styled-components';

export const CloseModal = styled.div`
  display: 'block';
  text-align: right;
  right: 0;

  & > svg {
    cursor: pointer;
  }
`;

export const ModalComponent = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  background: #fff;
  padding: 20px 30px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  width: 50%;
  text-align: left;

  h1 {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 40px;
  }

  p {
    margin: 0;
    padding: 0;
    line-height: 8px;
  }

  button {
    background: #ee4d64;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 16px;
    display: flex;
    border-radius: 4px;
    width: 100%;
    text-align: center;
    display: block;
  }
`;

export const Question = styled.div`
  line-height: 26px;
  color: #666;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
`;

export const Answer = styled.textarea`
  border: 1px solid #dddddd;
  border-radius: 4px;
  height: 127px;
  width: 100%;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #999;
`;

export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;

  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  align-items: center;
  justify-content: center;
`;
