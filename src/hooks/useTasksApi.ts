import { useState, useCallback } from 'react';
import api from '../api/axios';
import type { TaskType } from '../types/todo.types';

export function useTasksApi() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/todos');
      setTasks(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError('Ошибка получения заданий');
      }
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddTask = useCallback(async (inputText: string) => {
    try {
      const response = await api.post('/todos', { title: inputText });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError('Ошибка добавления');
      }
    }
  }, []);

  const handleComplete = useCallback(async (id: number | string) => {
    try {
      await api.patch(`/todos/${id}/isCompleted`);
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id == String(id)
            ? { ...task, isCompleted: !task.isCompleted }
            : task,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError('Ошибка изменения состояния задания');
      }
    }
  }, []);

  const handleDelete = useCallback(async (id: number | string) => {
    try {
      await api.delete(`/todos/${id}`);
      setTasks((tasks) => tasks.filter((task) => task.id != String(id)));
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError('Ошибка удаления задания');
      }
    }
  }, []);

  const handleDeleteCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.isCompleted);

    try {
      await Promise.all(
        completedTasks.map((task) => api.delete(`/todos/${task.id}`)),
      );
      setTasks((tasks) => tasks.filter((task) => !task.isCompleted));
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError('Ошибка удаления некоторых завершенных заданий');
      }
    }
  };

  const handleEdit = useCallback(
    async (id: number | string, newTitle: string) => {
      try {
        await api.patch(`/todos/${id}`, { title: newTitle });
        setTasks((tasks) =>
          tasks.map((task) => {
            if (task.id == String(id)) return { ...task, title: newTitle };
            return task;
          }),
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError('Ошибка изменения задания');
        }
      }
    },
    [],
  );

  return {
    tasks,
    loading,
    error,
    setTasks,
    fetchTasks,
    handleAddTask,
    handleComplete,
    handleDelete,
    handleDeleteCompleted,
    handleEdit,
  };
}
