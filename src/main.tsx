import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер не найден');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
