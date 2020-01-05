import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import api from '~/services/api';
import { reloadRequest } from '~/store/modules/helporder/actions';
import {
  Container,
  HelpOrderContainer,
  HelpOrderTextArea,
  HelpOrderSendButton,
} from './styles';

function SendHelpOrder({ navigation }) {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState();
  const studentid = useSelector(state => state.auth.studentid);

  async function handleSubmit() {
    try {
      await api.post(`/students/${studentid}/help-orders`, {
        question,
      });
      await dispatch(reloadRequest(studentid));

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

SendHelpOrder.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

SendHelpOrder.defaultProps = {
  navigation: PropTypes.object,
};

export default withNavigationFocus(SendHelpOrder);
