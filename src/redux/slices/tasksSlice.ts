import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getTasks,
  addNewTask,
  editTaskTitle,
  switchCompleteStatus,
  deleteTask,
  deleteCompletedTasks,
} from '../api/tasksApi';
import type { Filters, TaskType } from '../../types/todo.types';

type InitialStateType = {
  value: TaskType[];
  filter: Filters;
  loading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  value: JSON.parse(localStorage.getItem('tasks') || '[]'),
  filter: 'all',
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Filters>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getTasks.fulfilled,
        (state, action: PayloadAction<TaskType[]>) => {
          state.value = action.payload;
        },
      )
      .addCase(
        addNewTask.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.value.unshift(action.payload);
        },
      )
      .addCase(
        editTaskTitle.fulfilled,
        (state, action: PayloadAction<{ id: string; title: string }>) => {
          const task = state.value.find(
            (task) => task.id === action.payload.id,
          );

          if (task) {
            task.title = action.payload.title;
          }
        },
      )
      .addCase(switchCompleteStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload.at(0);
        if (updatedTask) {
          const task = state.value.find((task) => task.id === updatedTask.id);

          if (task) {
            task.isCompleted = !task.isCompleted;
          }
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.value = state.value.filter((task) => {
          return task.id !== action.payload.id;
        });
      })
      .addCase(deleteCompletedTasks.fulfilled, (state) => {
        state.value = state.value.filter((task) => !task.isCompleted);
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.error = action.payload;
        },
      );
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;
