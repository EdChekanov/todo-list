import { useToDoContext } from '../../сontext/Context';

const Footer = () => {
  const { tasks, handleDeleteCompleted } = useToDoContext();

  return (
    <div className="footer">
      <p>Осталоcь дел: {tasks.filter((task) => !task.isCompleted).length}</p>
      <button className="footer-btn" onClick={handleDeleteCompleted}>
        Удалить завершенные дела
      </button>
    </div>
  );
};

export default Footer;
