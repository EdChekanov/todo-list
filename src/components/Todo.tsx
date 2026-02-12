import Header from './todo/Header';
import InputTask from './todo/InputTask';
import TasksList from './todo/TasksList';
import Filters from './todo/Filters';
import Footer from './todo/Footer';

const Todo = () => {
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
