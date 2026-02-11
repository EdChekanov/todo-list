import { useEffect, useState } from 'react';
import { useTasksApi } from '../hooks/useTasksApi';
import Header from './todo/Header';
import InputTask from './todo/InputTask';
import TasksList from './todo/TasksList';
import Filters from './todo/Filters';
import Footer from './todo/Footer';
import { ToDoContext } from '../сontext/Context';
import type { Filters as FiltersType } from '../types/todo.types';

const Todo = () => {
  const {
    tasks,
    loading,
    error,
    setTasks,
    handleAddTask,
    handleComplete,
    handleDelete,
    handleDeleteCompleted,
    handleEdit,
    fetchTasks,
  } = useTasksApi();

  const [filter, setFilter] = useState<FiltersType>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) return <h1>Загрузка...</h1>;
  if (error) {
    if (error instanceof Error) return <h1>Ошибка: {error.message}</h1>;
    return <h1>Ошибка: {error}</h1>;
  }

  return (
    <ToDoContext.Provider
      value={{
        error,
        tasks,
        setTasks,
        filter,
        setFilter,
        filteredTasks,
        handleAddTask,
        handleComplete,
        handleDelete,
        handleDeleteCompleted,
        handleEdit,
      }}
    >
      <div className="wrapper">
        <Header />
        <InputTask />
        <TasksList />
        <Filters />
        <Footer />
      </div>
    </ToDoContext.Provider>
  );
};

export default Todo;
