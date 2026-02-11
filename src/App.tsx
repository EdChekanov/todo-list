import { Route, Routes } from 'react-router';
import Todo from './components/Todo';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegisterForm />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Todo />} />
      </Route>
      <Route path="*" element={<h1>Упс... Ничего не найдено</h1>} />
    </Routes>
  );
}

export default App;
