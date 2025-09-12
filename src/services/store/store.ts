import {
  combineReducers,
  combineSlices,
  configureStore
} from '@reduxjs/toolkit';
import { userReducer, userSlice } from '../slices/userSlice';
import {
  ingredientsReducer,
  ingredientsSlice
} from '../slices/ingredientsSlice';
import { orderReducer, orderSlice } from '../slices/orderSlice';
import { feedReducer, feedSlice } from '../slices/feedSlice';
import {
  constructorReducer,
  constructorSlice
} from '../slices/constructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
