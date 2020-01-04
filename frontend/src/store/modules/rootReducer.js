import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './student/reducer';
import user from './user/reducer';
import plan from './plan/reducer';
import enrolment from './enrolment/reducer';
import helporder from './helporder/reducer';

export default combineReducers({
  auth,
  user,
  student,
  plan,
  enrolment,
  helporder,
});
