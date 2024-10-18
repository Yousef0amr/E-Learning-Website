import React from 'react';

import { AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/common/Navbar.jsx';
import { Wrapper } from './components/common/Wrapper.jsx';
import { useTheme } from './context/ThemeProvider.jsx';
import AppRoutes from './router/AppRoutes.jsx';
import BackToTop from './components/common/BackToTop.jsx';

function App() {

  const { darkMode, toggleDarkMode } = useTheme();


  return (

    <div className={darkMode ? 'App dark-mode' : 'App'} >

      <NavbarComponent toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <AnimatePresence mode='wait'  >
        <Wrapper >
          <AppRoutes />
        </Wrapper>
      </AnimatePresence>
      <BackToTop />
    </div>
  );
}

export default App;
