import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../../api/axios';
import { useNavigate } from 'react-router';
import type { LoginData } from '../../types/auth.types';

const schema = z.object({
  email: z.string().email('Некорректный email'),
  password: z
    .string()
    .min(8, 'Пароль минимум 8 символов')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Пароль должен содержать: 1 заглавную букву, 1 строчную, 1 цифру, 1 спецсимвол',
    ),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ошибка входа:', error);
        alert(error.message);
      } else {
        throw new Error('Ошибка входа');
      }
    }
  };

  return (
    <>
      <h1>Вход</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label htmlFor="e-mail">E-mail</label>
          <input
            {...register('email')}
            type="email"
            id="e-mail"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <span className="error-text">{errors.email.message}</span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="password">Пароль</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <span className="error-text">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" disabled={!isValid}>
          Войти
        </button>
        <button
          type="button"
          className="small-btn-text"
          onClick={() => navigate('/registration')}
        >
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

export default LoginForm;
