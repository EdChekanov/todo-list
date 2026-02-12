export const change = (text: string) => {
  return {
    type: 'CHANGE',
    payload: text,
  } as const;
};

export const clear = () => {
  return {
    type: 'CLEAR',
  } as const;
};

export type ActionType = ReturnType<typeof change> | ReturnType<typeof clear>;
