import { combineReducers } from 'redux';

import auth from './auth/reducer';
import helporder from './helporder/reducer';

export default combineReducers({
  auth,
  helporder,
});
