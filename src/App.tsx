import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/NavBar';

import { useAuth } from './contexts/AuthContext';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return isAuthenticated ? (children) : <Navigate to="/login" replace />;
};


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth(); 
 const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };


  return (
 
      <div className="flex min-h-screen p-4 lg:p-6 bg-gradient-to-br from-blue-300 via-green-300 to-yellow-300">
        <div className={`flex flex-1 rounded-3xl overflow-hidden ${isLoginPage ? '' : 'bg-white shadow-2xl relative'}`}>

          {isAuthenticated && (
            <Sidebar
              isOpen={true}
              onClose={handleCloseMobileMenu}
              className="hidden md:flex"
            />
          )}

          <div className="flex-1 flex flex-col min-w-0"> 
            {isAuthenticated && (
              <Navbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
            )}

            <main className="flex-1 px-6 pb-6 overflow-auto">
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
                <Route path="/projects/:id" element={<PrivateRoute><ProjectDetailPage /></PrivateRoute>} />
                <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
                <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

                <Route path="*" element={isAuthenticated ? (
                  <div className="p-8 text-center text-gray-700 h-full flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-4">404 - Página no encontrada</h2>
                    <p>Lo sentimos, la página que buscas no existe.</p>
                  </div>
                ) : (
                    <Navigate to="/login" replace />
                )} />
              </Routes>
            </main>
          </div>

          {isAuthenticated && (
            <Sidebar
              isOpen={mobileMenuOpen}
              onClose={handleCloseMobileMenu}
              className="md:hidden"
            />
          )}
        </div>
      </div>

  );
}

export default App;