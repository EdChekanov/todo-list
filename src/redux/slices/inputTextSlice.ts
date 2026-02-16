import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = { value: string };

const initialState: InitialStateType = { value: '' };

const inputTextSlice = createSlice({
  name: 'inputText',
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    clear(state) {
      state.value = '';
    },
  },
});

export const { change, clear } = inputTextSlice.actions;
export default inputTextSlice.reducer;
