import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import authReducer from './reducer/authSlice'
import JobReducer from './Jobs/JobSlice'
import ChatReducer from './Chat/ChatSlice'
import { combineReducers } from '@reduxjs/toolkit';
import "bootstrap/dist/css/bootstrap.min.css";

const combineReducer = combineReducers({
  authReducer,
  JobReducer,
  ChatReducer
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
  // blacklist: ["JobReducer"],
};

const persistedReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistedReducer,

})

export const persistor = persistStore(store);

export default store;
