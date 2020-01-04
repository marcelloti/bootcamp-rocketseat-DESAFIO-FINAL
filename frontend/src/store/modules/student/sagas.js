import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  studentCreateSuccess,
  studentCreateFailure,
  studentUpdateSuccess,
  studentUpdateFailure,
} from './actions';

export function* createStudentRequest({ payload }) {
  try {
    const { name, email, age, weight, height } = payload.data;

    const student = {
      name,
      email,
      age,
      weight,
      height,
    };

    const response = yield call(api.post, 'students', student);

    toast.success('Estudante criado com sucesso!');

    yield put(studentCreateSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao criar estudante, confira seus dados!');
    yield put(studentCreateFailure());
  }
}

export function* updateStudentRequest({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload.data;

    const student = {
      id,
      name,
      email,
      age,
      weight,
      height,
    };

    const response = yield call(api.put, 'students', student);

    toast.success('Estudante atualizado com sucesso!');

    yield put(studentUpdateSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar estudante, confira seus dados!');
    yield put(studentUpdateFailure());
  }
}

export function* redirectSuccess() {
  yield history.push('/students');
}

export default all([
  takeLatest('@student/STUDENT_CREATE_REQUEST', createStudentRequest),
  takeLatest('@student/STUDENT_UPDATE_REQUEST', updateStudentRequest),
  takeLatest('@student/STUDENT_UPDATE_SUCCESS', redirectSuccess),
  takeLatest('@student/STUDENT_CREATE_SUCCESS', redirectSuccess),
]);
