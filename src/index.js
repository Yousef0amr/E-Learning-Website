import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';
import AuthProvider from './utils/auth.js';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider >
        <Provider store={store}>
          <CookiesProvider >
            <AuthProvider>
              <App />
            </AuthProvider>
          </CookiesProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
