import { combineReducers } from '@reduxjs/toolkit';
// import customersReducer from './customersReducer';
// import customersReducer from '@/stores/customersReducer';

import globalReducer from './global.store';
import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';
import customersReducer from './customersReducer'
import usersReducer from './usersReducer';
const rootReducer = combineReducers({
  user: userReducer,
  users:usersReducer,
  customers:customersReducer,
  tagsView: tagsViewReducer,
  global: globalReducer,
});

export default rootReducer;
