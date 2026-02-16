import { configureStore } from '@reduxjs/toolkit';

import inputTextReducer from './slices/inputTextSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    inputText: inputTextReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
