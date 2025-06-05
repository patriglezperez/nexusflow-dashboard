
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';


import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/NavBar';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false); 
  };

  return (
    <Router>

      <div className="flex min-h-screen bg-light p-4 lg:p-6">
        <div className="flex flex-1 rounded-3xl shadow-2xl overflow-hidden bg-white">
          <Sidebar
            isOpen={true} 
            onClose={handleCloseMobileMenu}
            className="hidden md:flex" 
          />

          <div className="flex-1 flex flex-col min-w-0">
            <Navbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

            <main className="flex-1 px-6 pb-6 overflow-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={
                  <div className="p-8 text-center text-gray-700 h-full flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-4">404 - Página no encontrada</h2>
                    <p>Lo sentimos, la página que buscas no existe.</p>
                  </div>
                } />
              </Routes>
            </main>
          </div>

          <Sidebar
            isOpen={mobileMenuOpen}
            onClose={handleCloseMobileMenu}
            className="md:hidden" 
          />
        </div>
      </div>
    </Router>
  );
}

export default App;