import type { ActionType } from '../actions/InputTextActions';

const initValue = {
  value: '',
};

type InitStateType = typeof initValue;

const inputTextReducer = (
  store: InitStateType = initValue,
  action: ActionType,
): InitStateType => {
  switch (action.type) {
    case 'CHANGE':
      return { ...store, value: action.payload };
    case 'CLEAR':
      return { ...store, value: '' };
    default:
      return store;
  }
};

export default inputTextReducer;
