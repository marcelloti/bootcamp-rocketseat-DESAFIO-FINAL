import styled from 'styled-components/native';

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

export const HelpOrderTitle = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
export const HelpOrderStatus = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const HelpOrderInfoTitle = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 14px;
  margin-left: 8px;
`;

export const HelpOrderTime = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const HelpOrderButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const HelpOrderQuestion = styled.View`
  margin: 10px;
`;

export const HelpOrderQuestionText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #666 !important;
`;
