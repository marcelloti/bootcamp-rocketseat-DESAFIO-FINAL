import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  planCreateSuccess,
  planCreateFailure,
  planUpdateSuccess,
  planUpdateFailure,
} from './actions';

export function* createPlanRequest({ payload }) {
  try {
    const { title, duration, price } = payload.data;

    const plan = {
      title,
      duration,
      price,
    };

    const response = yield call(api.post, 'plans', plan);

    toast.success('Plano criado com sucesso!');

    yield put(planCreateSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao criar plano, confira seus dados!');
    yield put(planCreateFailure());
  }
}

export function* updatePlanRequest({ payload }) {
  try {
    const { id, title, duration, price } = payload.data;

    const plan = {
      title,
      duration,
      price,
    };

    const response = yield call(api.put, `plans/${id}`, plan);

    toast.success('Plano atualizado com sucesso!');

    yield put(planUpdateSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar plano, confira seus dados!');
    yield put(planUpdateFailure());
  }
}

export function* redirectSuccess() {
  yield history.push('/plans');
}

export default all([
  takeLatest('@plan/PLAN_CREATE_REQUEST', createPlanRequest),
  takeLatest('@plan/PLAN_UPDATE_REQUEST', updatePlanRequest),
  takeLatest('@plan/PLAN_UPDATE_SUCCESS', redirectSuccess),
  takeLatest('@plan/PLAN_CREATE_SUCCESS', redirectSuccess),
]);
