
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjectsData } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY_PROJECTS = 'nexusflow_projects';


export interface ProjectContextType {
  projects: Project[];
  addProject: (newProjectData: Omit<Project, 'id' | 'progress' | 'tasksCount' | 'completedTasksCount'>) => void;
  getProjectById: (id: string) => Project | undefined;
}


export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(initialProjectsData));
    return initialProjectsData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProjectData: Omit<Project, 'id' | 'progress' | 'tasksCount' | 'completedTasksCount'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: uuidv4(),
      progress: 0,
      tasksCount: 0,
      completedTasksCount: 0,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const getProjectById = (id: string) => projects.find(project => project.id === id);

  const contextValue: ProjectContextType = {
    projects,
    addProject,
    getProjectById,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};