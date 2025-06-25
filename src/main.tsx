import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TaskProvider } from './contexts/TaskContext';
import { UserProvider } from './contexts/UserContext'; 
import { ProjectProvider } from './contexts/ProjectContext'; 
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <AuthProvider>
        <UserProvider>
          <ProjectProvider>
            <TaskProvider>
              <App />
            </TaskProvider>
          </ProjectProvider>
        </UserProvider>
      </AuthProvider> 
    </BrowserRouter>
  </React.StrictMode>,
);
