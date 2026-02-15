import { InputTextActionTypes } from '../../types/actions.types';

export const change = (text: string) => {
  return {
    type: InputTextActionTypes.CHANGE,
    payload: text,
  } as const;
};

export const clear = () => {
  return {
    type: InputTextActionTypes.CLEAR,
  } as const;
};

export type ActionType = ReturnType<typeof change> | ReturnType<typeof clear>;
