import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import Background from '~/components/Background';
import api from '~/services/api';

import {
  Container,
  HelpOrderContainer,
  HelpOrderTextArea,
  HelpOrderSendButton,
} from './styles';

function SendHelpOrder({ navigation }) {
  const [question, setQuestion] = useState();
  const studentid = useSelector(state => state.auth.studentid);

  async function handleSubmit() {
    try {
      await api.post(`/students/${studentid}/help-orders`, {
        question,
      });

      Alert.alert('Confirmação', 'Seu pedido de auxílio foi registrado');

      navigation.navigate('HelpOrderList');
    } catch (err) {
      Alert.alert('', 'Não foi possível cadastrar o pedido de auxílio');
    }
  }

  return (
    <Background>
      <Container>
        <HelpOrderContainer>
          <HelpOrderTextArea
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            placeholder="Inclua seu pedido de auxílio"
            onChangeText={setQuestion}
          />
          <HelpOrderSendButton onPress={handleSubmit}>
            Enviar pedido
          </HelpOrderSendButton>
        </HelpOrderContainer>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(SendHelpOrder);
