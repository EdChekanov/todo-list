import { createContext, useContext } from 'react';
import type { ToDoContextType } from '../types/todo.types';

export const ToDoContext = createContext<ToDoContextType | null>(null);

export const useToDoContext = (): ToDoContextType => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error(
      'useToDoContext должен использоваться внутри ToDoContext.Provider',
    );
  }
  return context;
};
