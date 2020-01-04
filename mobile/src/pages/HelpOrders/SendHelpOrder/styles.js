import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HelpOrderContainer = styled.View`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #fff;
`;
export const HelpOrderTextArea = styled.TextInput`
  color: #666;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const HelpOrderSendButton = styled(Button)``;
