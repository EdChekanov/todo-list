import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import Task from './Task';
import { LiaFrownOpen } from 'react-icons/lia';

const TasksList = () => {
  const {
    value: tasks,
    filter,
    loading,
  } = useAppSelector((store) => store.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  if (!filteredTasks.length)
    return (
      <ul className="task-list">
        <li>
          Пусто <LiaFrownOpen />
        </li>
      </ul>
    );

  return (
    <ul className="task-list">
      {loading && (
        <li>
          <b>Загрузка...</b>
        </li>
      )}
      {filteredTasks.map((task) => (
        <span key={task.id}>
          <Task task={task} />
        </span>
      ))}
    </ul>
  );
};

export default TasksList;
