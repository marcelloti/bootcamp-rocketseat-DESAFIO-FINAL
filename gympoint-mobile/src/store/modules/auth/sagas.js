import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { studentid } = payload;

    yield call(api.post, `students/${studentid}/checkins`);

    yield put(signInSuccess(studentid));
  } catch (err) {
    let errorMsg = '';
    if (err.response.data.error) {
      errorMsg = err.response.data.error;
    } else {
      errorMsg = 'Um erro desconhecido ocorreu';
    }
    Alert.alert('Falha no login/checkin', errorMsg);

    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
