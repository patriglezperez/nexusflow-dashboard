

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Project,
  NewProjectData, 
  addProject as addProjectToData,
  deleteProject as deleteProjectFromData,
  updateProject as updateProjectToData,
  projects as initialProjects 
} from '../utils/data';


export interface ProjectContextType {
  projects: Project[];
  addProject: (projectData: NewProjectData) => Project;
  deleteProject: (id: string) => boolean;
  updateProject: (updatedProject: Project) => boolean;
  refreshProjects: () => void;
}


export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);


export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectsState, setProjectsState] = useState<Project[]>(initialProjects);  
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    setProjectsState([...initialProjects]);
  }, [refreshKey]);

  const handleAddProject = useCallback((newProjectData: NewProjectData) => { 
    const newProject = addProjectToData(newProjectData); 
    setProjectsState(prev => [...prev, newProject]);
    return newProject;
  }, []); 

  const handleDeleteProject = useCallback((id: string) => {
    const deleted = deleteProjectFromData(id); 
    if (deleted) {
      setProjectsState(prev => prev.filter(p => p.id !== id));
    }
    return deleted;
  }, []); 

  const handleUpdateProject = useCallback((updatedProject: Project) => {
    const updated = updateProjectToData(updatedProject); 
    if (updated) {
      setProjectsState(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p)); 
    }
    return updated;
  }, []); 

 
  const refreshProjects = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const contextValue: ProjectContextType = {
    projects: projectsState,
    addProject: handleAddProject,
    deleteProject: handleDeleteProject,
    updateProject: handleUpdateProject,
    refreshProjects,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};