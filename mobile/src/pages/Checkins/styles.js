import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const CheckinCell = styled.View`
  height: 46px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background: #fff;
`;
export const CheckTitle = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 14px;
`;

export const CheckTime = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const DivButton = styled.View`
  padding: 20px 20px 0 20px;
`;

export const CheckInButton = styled(Button)``;

export const CheckInButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
