import React, { useEffect, useState, useCallback } from 'react';
import { useSelector /* , useDispatch */ } from 'react-redux';
import { Image, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
/* import {  signOut } from '~/store/modules/auth/actions'; */
import Background from '~/components/Background';
import logoHeader from '~/assets/logo-header.png';

import {
  Container,
  CheckInButton,
  CheckinCell,
  DivButton,
  CheckTitle,
  CheckTime,
  List,
  Header,
} from './styles';

function Checkins() {
  /*
  Enable this , useDispatch and the signOut action on imports to app logout

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);
  */

  const [checkins, setCheckins] = useState([]);
  const studentid = useSelector(state => state.auth.studentid);

  const loadCheckIns = useCallback(async () => {
    let response = await api.get(`students/${studentid}/checkins`);
    let checkInNumber = response.data.length + 1;
    response = response.data.map(checkin => {
      checkInNumber -= 1;

      const retorno = {
        ...checkin,
        checkInNumber,
        formattedTime: formatRelative(
          parseISO(checkin.created_at),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      };

      return retorno;
    });

    setCheckins(response);
  }, [studentid]);

  useEffect(() => {
    loadCheckIns();
  }, [loadCheckIns, studentid]);

  async function newCheckIn() {
    try {
      await api.post(`/students/${studentid}/checkins`);
      loadCheckIns();
    } catch (err) {
      let errorMsg = 'Um erro desconhecido ocorreu';
      if (typeof err.response.data.error === 'string') {
        errorMsg = err.response.data.error;
      }
      Alert.alert('Falha no checkin', errorMsg);
    }
  }

  return (
    <Background>
      <Container>
        <DivButton>
          <CheckInButton onPress={newCheckIn}>Novo check-in</CheckInButton>
        </DivButton>
        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CheckinCell>
              <CheckTitle>Check-in #{item.checkInNumber}</CheckTitle>
              <CheckTime>{item.formattedTime}</CheckTime>
            </CheckinCell>
          )}
        />
      </Container>
    </Background>
  );
}

Checkins.navigationOptions = {
  headerTitle: () => (
    <Header>
      <Image resizeMode="contain" source={logoHeader} />
    </Header>
  ),
};

export default withNavigationFocus(Checkins);
