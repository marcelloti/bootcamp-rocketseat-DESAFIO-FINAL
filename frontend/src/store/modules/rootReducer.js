import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './student/reducer';
import plan from './plan/reducer';
import enrolment from './enrolment/reducer';
import helporder from './helporder/reducer';

export default combineReducers({
  auth,
  student,
  plan,
  enrolment,
  helporder,
});
