import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  answerHelpOrderSuccess,
  answerHelpOrderFailure,
  modalCloseRequest,
} from './actions';

export function* answerHelpOrderRequest({ payload }) {
  try {
    const { helporderId, answerValue } = payload.data;

    const response = yield call(api.put, `help-orders/${helporderId}/answer`, {
      answer: answerValue,
    });

    yield put(answerHelpOrderSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao enviar resposta ao estudante');
    yield put(answerHelpOrderFailure());
  }
}

export function* answerHelpOrderCompleted() {
  toast.success('Resposta envia ao estudante');
  yield put(modalCloseRequest());
}

export default all([
  takeLatest('@helporder/ANSWER_HELPORDER_REQUEST', answerHelpOrderRequest),
  takeLatest('@helporder/ANSWER_HELPORDER_SUCCESS', answerHelpOrderCompleted),
]);
