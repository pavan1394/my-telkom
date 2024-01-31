import { combineReducers } from 'redux';

import session from '../modules/auth/session';
import signin from '../modules/auth/signin';
import home from '../modules/home/home';
import yepHome from '../modules/yep/yep';

export default combineReducers({
  session,
  signin,
  home,
  yepHome,
});
