import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { pt } from 'date-fns/locale/pt';
import { format } from 'date-fns';
import api from '~/services/api';
import history from '~/services/history';

import {
  enrolmentCreateSuccess,
  enrolmentCreateFailure,
  enrolmentUpdateSuccess,
  enrolmentUpdateFailure,
} from './actions';

export function* createEnrolmentRequest({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload.data;

    const converted_start_date = format(
      start_date,
      "yyyy-MM-dd'T12:00:00'.'000Z'",
      {
        locale: pt,
      }
    );

    const enrolment = {
      student_id,
      plan_id,
      start_date: converted_start_date,
    };

    const response = yield call(api.post, 'enrolments', enrolment);

    toast.success('Matrícula criada com sucesso!');

    yield put(enrolmentCreateSuccess(response.data));
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.tron(err);
    }
    toast.error('Erro ao criar matrícula, confira seus dados!');
    yield put(enrolmentCreateFailure());
  }
}

export function* updateEnrolmentRequest({ payload }) {
  try {
    const { id, student_id, plan_id, start_date } = payload.data;

    const enrolment = {
      student_id,
      plan_id,
      start_date,
    };

    const response = yield call(api.put, `enrolments/${id}`, enrolment);

    toast.success('Matrícula atualizada com sucesso!');

    yield put(enrolmentUpdateSuccess(response.data));
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.tron(err);
    }
    toast.error('Erro ao atualizar matrícula, confira seus dados!');
    yield put(enrolmentUpdateFailure());
  }
}

export function* redirectSuccess() {
  yield history.push('/enrolments');
}

export default all([
  takeLatest('@enrolment/ENROLMENT_CREATE_REQUEST', createEnrolmentRequest),
  takeLatest('@enrolment/ENROLMENT_UPDATE_REQUEST', updateEnrolmentRequest),
  takeLatest('@enrolment/ENROLMENT_UPDATE_SUCCESS', redirectSuccess),
  takeLatest('@enrolment/ENROLMENT_CREATE_SUCCESS', redirectSuccess),
]);
