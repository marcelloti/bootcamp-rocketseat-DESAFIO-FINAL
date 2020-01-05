import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { reloadFailure, reloadSuccess } from './actions';

export function* reloadAction({ payload }) {
  try {
    const { studentid } = payload;
    const response = yield call(api.get, `students/${studentid}/help-orders`);
    yield put(reloadSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha de carregamento',
      'Falha ao carregar pedidos de auxílio'
    );
    yield put(reloadFailure());
  }
}

export default all([takeLatest('@helporder/RELOAD_REQUEST', reloadAction)]);
