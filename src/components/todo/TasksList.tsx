import Task from './Task';
import { LiaFrownOpen } from 'react-icons/lia';
import { useToDoContext } from '../../сontext/Context';

const TasksList = () => {
  const { filteredTasks } = useToDoContext();

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
      {filteredTasks.map((task) => (
        <span key={task.id}>
          <Task task={task} />
        </span>
      ))}
    </ul>
  );
};

export default TasksList;
