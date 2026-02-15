import { TaskActionTypes } from '../../types/actions.types';
import type { Filters, TaskType } from '../../types/todo.types';
import type { ActionType } from '../actions/tasksActions';

const initValue = {
  value: JSON.parse(
    localStorage.getItem('tasks') ||
      JSON.stringify([
        {
          id: '1',
          title: 'Выучить react',
          isCompleted: false,
        },
        {
          id: '2',
          title: 'Сдать 2-й чек-лист',
          isCompleted: false,
        },
      ]),
  ) as TaskType[],
  filter: 'all' as Filters,
};

type InitStateType = typeof initValue;

const tasksReducer = (
  store: InitStateType = initValue,
  action: ActionType,
): InitStateType => {
  switch (action.type) {
    case TaskActionTypes.ADD_NEW_TASK:
      return {
        ...store,
        value: [
          ...store.value,
          {
            id: action.payload.id,
            title: action.payload.title,
            isCompleted: false,
          },
        ],
      };
    case TaskActionTypes.EDIT_TASK_TITLE:
      return {
        ...store,
        value: store.value.map((task) => {
          if (task.id == action.payload.id) {
            return { ...task, title: action.payload.newTitle };
          }
          return task;
        }),
      };
    case TaskActionTypes.SWITCH_COMPLETE_STATUS:
      return {
        ...store,
        value: store.value.map((task) => {
          if (task.id == action.payload.id) {
            return { ...task, isCompleted: !task.isCompleted };
          }
          return task;
        }),
      };
    case TaskActionTypes.DELETE_TASK:
      return {
        ...store,
        value: store.value.filter((task) => {
          return task.id !== action.payload.id;
        }),
      };
    case TaskActionTypes.DELETE_COMPLETED_TASKS:
      return {
        ...store,
        value: store.value.filter((task) => !task.isCompleted),
      };
    case TaskActionTypes.SET_FILTER:
      return { ...store, filter: action.payload };
    default:
      return store;
  }
};

export default tasksReducer;
