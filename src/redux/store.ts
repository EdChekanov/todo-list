import {
  legacy_createStore as createStore,
  combineReducers,
  type AnyAction,
} from 'redux';
import { type ThunkAction, type ThunkDispatch } from 'redux-thunk';
import inputTextReducer from './reducers/InputTextReducer';
import tasksReducer from './reducers/tasksReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  inputText: inputTextReducer,
});

const store = createStore(rootReducer);

export default store;

export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
