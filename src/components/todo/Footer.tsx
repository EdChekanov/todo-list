import { deleteCompletedTasks } from '../../redux/api/tasksApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Footer = () => {
  const tasks = useAppSelector((store) => store.tasks.value);
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(deleteCompletedTasks());

  return (
    <div className="footer">
      <p>Осталоcь дел: {tasks.filter((task) => !task.isCompleted).length}</p>
      <button className="footer-btn" onClick={handleClick}>
        Удалить завершенные дела
      </button>
    </div>
  );
};

export default Footer;
