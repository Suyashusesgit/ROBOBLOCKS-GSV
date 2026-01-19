import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import SmoothScroll from './animations/SmoothScroll';

import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { About, Rules, Teams } from './pages/StaticPages';
import AdminDashboard from './pages/AdminDashboard';

import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import Gallery from './pages/Gallery';
import Schedule from './pages/Schedule';
import Leaderboard from './pages/Leaderboard';
import FAQ from './pages/FAQ';

const AppContent = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="about" element={<About />} />
              <Route path="rules" element={<Rules />} />
              <Route path="teams" element={<Teams />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="faq" element={<FAQ />} />
            </Route>
          </Routes>
          <ThemeSwitcher />
        </SmoothScroll>
      </Router>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
