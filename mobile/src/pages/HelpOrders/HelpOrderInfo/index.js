import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import Background from '~/components/Background';

import {
  Container,
  HelpOrderContainer,
  HelpOrderTitle,
  HelpOrderStatus,
  HelpOrderInfoTitle,
  HelpOrderTime,
  HelpOrderQuestion,
  HelpOrderQuestionText,
} from './styles';

function HelpOrderInfo({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Background>
      <Container>
        <HelpOrderContainer>
          <HelpOrderTitle>
            <HelpOrderStatus>
              <HelpOrderInfoTitle>PERGUNTA</HelpOrderInfoTitle>
            </HelpOrderStatus>
            <HelpOrderTime>{helpOrder.formattedTime}</HelpOrderTime>
          </HelpOrderTitle>
          <HelpOrderQuestion>
            <HelpOrderQuestionText>{helpOrder.question}</HelpOrderQuestionText>
          </HelpOrderQuestion>

          <HelpOrderTitle>
            <HelpOrderStatus>
              <HelpOrderInfoTitle>RESPOSTA</HelpOrderInfoTitle>
            </HelpOrderStatus>
          </HelpOrderTitle>
          <HelpOrderQuestion>
            <HelpOrderQuestionText>{helpOrder.answer}</HelpOrderQuestionText>
          </HelpOrderQuestion>
        </HelpOrderContainer>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrderInfo);
