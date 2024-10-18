import React, { StrictMode, Suspense } from 'react';
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
import Loader from './components/common/Loader.jsx';
import { ErrorBoundary } from "react-error-boundary";
import './../src/localization/config.js'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundary fallback={<>some thing went wrong</>} >
    <StrictMode>
      <Suspense fallback={<Loader />} >

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

      </Suspense>
    </StrictMode>
  </ErrorBoundary>
);
