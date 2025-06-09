import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clientes from './components/Clientes';
import Login from './components/Login';
import { isAuthenticated } from './utils/auth';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ViewProvider, useView } from './contexts/ViewContext';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { viewType, toggleView } = useView();
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    // Check auth status when component mounts and when localStorage changes
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };

    window.addEventListener('storage', checkAuth);
    
    // Check auth status periodically
    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {isAuth && (
          <Navbar
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            viewType={viewType}
            toggleView={toggleView}
            onLogout={handleLogout}
          />
        )}
        <main className={`flex-grow container mx-auto px-4 ${isAuth ? 'pt-16' : 'pt-4'} pb-8`}>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuth ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                isAuth ? (
                  <Clientes />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/clientes" 
              element={
                isAuth ? (
                  <Clientes />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ViewProvider>
        <AppContent />
      </ViewProvider>
    </ThemeProvider>
  );
};

export default App;
