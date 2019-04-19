import { combineReducers } from 'redux';
import auth from './modules/auth/reducer';
import booking from './modules/booking/reducer';

export default combineReducers({
  auth,
  booking
});
