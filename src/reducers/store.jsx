import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import chart from './chart';

const reducer = combineReducers({ chart });

export default function createStore() {
  return configureStore({
    reducer,
    devTools: 'production',
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
}
