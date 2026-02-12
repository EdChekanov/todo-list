import type { Filters } from '../../types/todo.types';

export const addNewTask = (title: string) => {
  return {
    type: 'ADD_NEW_TASK',
    payload: title,
  } as const;
};

export const editTaskTitle = (editInfo: { id: string; newTitle: string }) => {
  return {
    type: 'EDIT_TASK_TITLE',
    payload: editInfo,
  } as const;
};

export const switchCompleteStatus = (info: { id: string }) => {
  return {
    type: 'SWITCH_COMPLETE_STATUS',
    payload: info,
  } as const;
};

export const deleteTask = (info: { id: string }) => {
  return {
    type: 'DELETE_TASK',
    payload: info,
  } as const;
};

export const deleteCompletedTask = () => {
  return {
    type: 'DELETE_COMPLETED_TASKS',
  } as const;
};

export const setFilter = (filter: Filters) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  } as const;
};

export type ActionType =
  | ReturnType<typeof addNewTask>
  | ReturnType<typeof editTaskTitle>
  | ReturnType<typeof switchCompleteStatus>
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof deleteCompletedTask>
  | ReturnType<typeof setFilter>;
