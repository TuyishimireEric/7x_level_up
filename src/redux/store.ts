import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';

export const rootReducer = combineReducers({
  todo: todoReducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
