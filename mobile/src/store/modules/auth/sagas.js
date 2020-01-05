import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { studentid } = payload;

    yield call(api.post, `sessionStudent/${studentid}`);

    yield put(signInSuccess(studentid));
  } catch (err) {
    let errorMsg = 'Um erro desconhecido ocorreu';
    if (typeof err.response.data.error === 'string') {
      errorMsg = err.response.data.error;
    }
    Alert.alert('Falha no login/checkin', errorMsg);

    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
