import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import helporder from './helporder/sagas';

export default function* rootSaga() {
  return yield all([auth, helporder]);
}
