import Header from './todo/Header';
import InputTask from './todo/InputTask';
import TasksList from './todo/TasksList';
import Filters from './todo/Filters';
import Footer from './todo/Footer';
import { useAppSelector } from '../redux/hooks';

const Todo = () => {
  const { error } = useAppSelector((store) => store.tasks);

  if (error) return <h1>Ошибка: {error}</h1>;

  return (
    <div className="wrapper">
      <Header />
      <InputTask />
      <TasksList />
      <Filters />
      <Footer />
    </div>
  );
};

export default Todo;
