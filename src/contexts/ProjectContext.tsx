// src/contexts/ProjectContext.tsx

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Project,
  NewProjectData, // <--- Importa el tipo NewProjectData definido en data.ts
  addProject as addProjectToData,
  deleteProject as deleteProjectFromData,
  updateProject as updateProjectToData,
  projects as initialProjects // Importa la variable 'projects' desde data.ts
} from '../utils/data'; // Asegúrate de la ruta correcta a data.ts

// Define el tipo del contexto
export interface ProjectContextType {
  projects: Project[];
  // Usa el tipo NewProjectData importado para la función addProject
  addProject: (projectData: NewProjectData) => Project; // <--- Tipo corregido aquí
  deleteProject: (id: string) => boolean;
  updateProject: (updatedProject: Project) => boolean;
  refreshProjects: () => void;
}

// Crea el contexto
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  // El estado interno para los proyectos
  const [projectsState, setProjectsState] = useState<Project[]>(initialProjects);

  // Un estado para forzar la recarga. Se incrementa cada vez que queremos refrescar.
  const [refreshKey, setRefreshKey] = useState(0);

  // useEffect para cargar los proyectos cuando el componente se monta o refreshKey cambia
  useEffect(() => {
    // Cuando refreshKey cambia, o al montar, volvemos a cargar los proyectos
    // desde la variable global 'projects' de data.ts.
    setProjectsState([...initialProjects]);
  }, [refreshKey]);

  // Función para añadir un proyecto
  // La firma de handleAddProject también debe usar NewProjectData
  const handleAddProject = useCallback((newProjectData: NewProjectData) => { // <--- Tipo corregido aquí
    const newProject = addProjectToData(newProjectData); // Llama a la función de data.ts
    setProjectsState(prev => [...prev, newProject]); // Actualiza el estado local del contexto
    return newProject;
  }, []); // Dependencias vacías, ya que addProjectToData es externa

  // Función para eliminar un proyecto
  const handleDeleteProject = useCallback((id: string) => {
    const deleted = deleteProjectFromData(id); // Llama a la función de data.ts
    if (deleted) {
      setProjectsState(prev => prev.filter(p => p.id !== id)); // Actualiza el estado local del contexto
    }
    return deleted;
  }, []); // Dependencias vacías

  // Función para actualizar un proyecto
  const handleUpdateProject = useCallback((updatedProject: Project) => {
    const updated = updateProjectToData(updatedProject); // Llama a la función de data.ts
    if (updated) {
      setProjectsState(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p)); // Actualiza el estado local del contexto
    }
    return updated;
  }, []); // Dependencias vacías

  // Función para forzar la recarga de proyectos desde la fuente de datos (localStorage a través de data.ts)
  const refreshProjects = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1); // Solo incrementamos la clave, useEffect hará la recarga
  }, []);

  // El valor que se proporciona a los componentes que consumen el contexto
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