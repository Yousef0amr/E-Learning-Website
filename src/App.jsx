import React from 'react';

import { AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Footer } from './components/common/Footer.jsx';
import NavbarComponent from './components/common/Navbar.jsx';

import { Wrapper } from './components/common/Wrapper.jsx';

import Loader from './components/common/Loader.jsx';
import { ParticlesComponent } from './components/header/Particles.jsx';
import { useTheme } from './context/ThemeProvider.jsx';
import AppRoutes from './router/AppRoutes.jsx';

function App() {

  const { darkMode, toggleDarkMode } = useTheme();


  return (

    <div className={darkMode ? 'App dark-mode' : 'App'}>
      <ParticlesComponent />
      <NavbarComponent toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <AnimatePresence mode='sync' >
        <Wrapper >
          <AppRoutes />
        </Wrapper>
      </AnimatePresence>


    </div>
  );
}

export default App;
