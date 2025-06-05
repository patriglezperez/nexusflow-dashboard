import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TaskProvider } from './contexts/TaskContext';
import { UserProvider } from './contexts/UserContext'; 
import { ProjectProvider } from './contexts/ProjectContext'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ProjectProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ProjectProvider>
    </UserProvider>
  </React.StrictMode>,
);