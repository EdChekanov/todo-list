import { createAppAsyncThunk } from '../hooks';
import api from '../../api/axios';
import type { TaskType } from '../../types/todo.types';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const getTasks = createAppAsyncThunk<TaskType[], void>(
  'tasks/getTasks',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<TaskType[]>('/todos');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue('Ошибка загрузки задач');
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const addNewTask = createAppAsyncThunk<TaskType, string>(
  'tasks/addNewTask',
  async (newTitle: string, thunkAPI) => {
    try {
      const { data } = await api.post<
        TaskType,
        AxiosResponse<TaskType>,
        { title: string }
      >('/todos', { title: newTitle });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue('Ошибка добавления задачи');
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const editTaskTitle = createAppAsyncThunk<
  TaskType,
  { id: string; newTitle: string }
>(
  'tasks/editTaskTitle',
  async ({ id, newTitle }: { id: string; newTitle: string }, thunkAPI) => {
    try {
      const { data } = await api.patch<
        TaskType,
        AxiosResponse<TaskType>,
        { title: string }
      >(`/todos/${id}`, { title: newTitle });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue('Ошибка изменения задачи');
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const switchCompleteStatus = createAppAsyncThunk<TaskType[], string>(
  'tasks/switchCompleteStatus',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await api.patch<TaskType[], AxiosResponse<TaskType[]>>(
        `/todos/${id}/isCompleted`,
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue('Ошибка изменения статуса задачи');
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const deleteTask = createAppAsyncThunk<TaskType, string>(
  'tasks/deleteTask',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await api.delete<TaskType, AxiosResponse<TaskType>>(
        `/todos/${id}`,
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue('Ошибка удаления задачи');
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const deleteCompletedTasks = createAppAsyncThunk<void, void>(
  'tasks/deleteCompletedTasks',
  async (_, thunkAPI) => {
    const { value: tasks } = thunkAPI.getState().tasks;
    const completedTasks = tasks.filter((task) => task.isCompleted);

    try {
      await Promise.all(
        completedTasks.map((task) => api.delete(`/todos/${task.id}`)),
      );
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue('Ошибка удаления завершенных задач');
      return thunkAPI.rejectWithValue(null);
    }
  },
);
