import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import logoHeader from '~/assets/logo-header.png';
import { reloadRequest } from '~/store/modules/helporder/actions';
import {
  Container,
  Header,
  HelpOrderContainer,
  HelpOrderButton,
  HelpOrderTitle,
  DivButton,
  HelpOrderStatus,
  HelpOrderStatusText,
  HelpOrderTime,
  HelpOrderQuestion,
  HelpOrderQuestionText,
  List,
} from './styles';

function HelpOrdersList({ navigation }) {
  const dispatch = useDispatch();
  const helpOrdersLoaded = useSelector(state => state.helporder.helpOrderList);

  const [helpOrders, setHelpOrders] = useState([]);

  const studentid = useSelector(state => state.auth.studentid);

  async function requestHelpOrderList() {
    await dispatch(reloadRequest(studentid));
  }

  if (typeof helpOrdersLoaded === 'undefined' || helpOrdersLoaded === '') {
    requestHelpOrderList();
  }

  function openResponse(helpOrder) {
    navigation.navigate('HelpOrderInfo', {
      helpOrder,
    });
  }

  const formatStatus = useCallback(helporder => {
    let responseStatus = 'Sem resposta';
    if (helporder.answer !== null) {
      responseStatus = 'Respondido';
    }
    return responseStatus;
  }, []);

  const formatHelpOrders = useCallback(async () => {
    let helpordersArray = [];
    if (Array.isArray(helpOrdersLoaded)) {
      helpordersArray = helpOrdersLoaded.map(helporder => {
        const helpOrderFormatted = {
          ...helporder,
          formattedStatus: formatStatus(helporder),
          formattedTime: formatRelative(
            parseISO(helporder.created_at),
            new Date(),
            {
              locale: pt,
              addSuffix: true,
            }
          ),
        };

        return helpOrderFormatted;
      });
    }

    setHelpOrders(helpordersArray);
  }, [formatStatus, helpOrdersLoaded]);

  useEffect(() => {
    formatHelpOrders();
  }, [formatHelpOrders, helpOrdersLoaded]);

  async function sendHelpOrderPage() {
    navigation.navigate('SendHelpOrder', {
      studentid,
    });
  }

  return (
    <Background>
      <Container>
        <DivButton>
          <HelpOrderButton onPress={sendHelpOrderPage}>
            Novo pedido de auxílio
          </HelpOrderButton>
        </DivButton>
        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HelpOrderContainer>
              <TouchableOpacity
                onPress={() => {
                  openResponse(item);
                }}
              >
                <HelpOrderTitle>
                  <HelpOrderStatus>
                    <Icon
                      name="check-circle"
                      size={20}
                      color={item.answer ? '#42cb59' : '#999'}
                    />
                    <HelpOrderStatusText answered={!!item.answer}>
                      {item.formattedStatus}
                    </HelpOrderStatusText>
                  </HelpOrderStatus>
                  <HelpOrderTime>{item.formattedTime}</HelpOrderTime>
                </HelpOrderTitle>
                <HelpOrderQuestion>
                  <HelpOrderQuestionText numberOfLines={3}>
                    {item.question}
                  </HelpOrderQuestionText>
                </HelpOrderQuestion>
              </TouchableOpacity>
            </HelpOrderContainer>
          )}
        />
      </Container>
    </Background>
  );
}

HelpOrdersList.navigationOptions = () => ({
  headerTitle: () => (
    <Header>
      <Image resizeMode="contain" source={logoHeader} />
    </Header>
  ),
});

HelpOrdersList.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

HelpOrdersList.defaultProps = {
  navigation: PropTypes.object,
};

export default withNavigationFocus(HelpOrdersList);
