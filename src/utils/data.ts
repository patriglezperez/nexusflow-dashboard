// src/utils/data.ts

import { v4 as uuidv4 } from 'uuid';

// --- Interfaces ---

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'pending';
  progress: number; // 0-100
  startDate: string; // Formato YYYY-MM-DD
  endDate: string;   // Formato YYYY-MM-DD
  teamMembers: string[]; // Array de IDs de usuario
  tasksCount: number; // Total de tareas para este proyecto
  completedTasksCount: number; // Tareas completadas para este proyecto
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string; // ID de usuario
  dueDate: string; // Formato YYYY-MM-DD
  createdAt: string; // Formato YYYY-MM-DD
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'developer' | 'designer';
  avatarUrl: string; // URL a la imagen del avatar
  status: 'active' | 'inactive';
}

// Tipo para los datos que se necesitan al crear un nuevo proyecto (excluye campos generados)
export type NewProjectData = Omit<Project, 'id' | 'progress' | 'tasksCount' | 'completedTasksCount'>;

// Tipo para los datos que se necesitan al crear una nueva tarea (excluye campos generados)
export type NewTaskData = Omit<Task, 'id' | 'createdAt'>;

// --- Datos Iniciales (para cuando localStorage esté vacío) ---

const initialUsers: User[] = [
  { id: 'user-1', name: 'Juan Pérez', email: 'juan@example.com', role: 'admin', avatarUrl: 'https://i.pravatar.cc/150?img=1', status: 'active' },
  { id: 'user-2', name: 'María López', email: 'maria@example.com', role: 'manager', avatarUrl: 'https://i.pravatar.cc/150?img=2', status: 'active' },
  { id: 'user-3', name: 'Carlos García', email: 'carlos@example.com', role: 'developer', avatarUrl: 'https://i.pravatar.cc/150?img=3', status: 'active' },
  { id: 'user-4', name: 'Ana Fernández', email: 'ana@example.com', role: 'designer', avatarUrl: 'https://i.pravatar.cc/150?img=4', status: 'active' },
  { id: 'user-5', name: 'Luis Martínez', email: 'luis@example.com', role: 'developer', avatarUrl: 'https://i.pravatar.cc/150?img=5', status: 'active' },
];

const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Desarrollo de App Móvil',
    description: 'Creación de una aplicación móvil para gestión de tareas.',
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    teamMembers: ['user-1', 'user-2', 'user-3'],
    tasksCount: 3,
    completedTasksCount: 2,
  },
  {
    id: 'proj-2',
    name: 'Rediseño Web Corporativo',
    description: 'Actualización completa de la página web de la empresa.',
    status: 'on-hold',
    progress: 40,
    startDate: '2024-03-01',
    endDate: '2024-09-15',
    teamMembers: ['user-2', 'user-4'],
    tasksCount: 2,
    completedTasksCount: 0,
  },
  {
    id: 'proj-3',
    name: 'Implementación CRM',
    description: 'Integración de un nuevo sistema CRM para ventas.',
    status: 'pending',
    progress: 0,
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    teamMembers: ['user-1', 'user-5'],
    tasksCount: 0,
    completedTasksCount: 0,
  },
  {
    id: 'proj-4',
    name: 'Campaña de Marketing Digital',
    description: 'Lanzamiento de una nueva campaña de marketing en redes sociales.',
    status: 'completed',
    progress: 100,
    startDate: '2023-11-01',
    endDate: '2024-02-28',
    teamMembers: ['user-2', 'user-4'],
    tasksCount: 2,
    completedTasksCount: 2,
  },
];

const initialTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    name: 'Diseño de Interfaz de Usuario',
    description: 'Crear wireframes y mockups para la aplicación móvil.',
    status: 'completed',
    priority: 'high',
    assignedTo: 'user-4', // Ana Fernández
    dueDate: '2024-02-28',
    createdAt: '2024-01-20',
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    name: 'Desarrollo Frontend Login',
    description: 'Implementar la pantalla de login y registro.',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'user-3', // Carlos García
    dueDate: '2024-06-15',
    createdAt: '2024-03-10',
  },
  {
    id: 'task-3',
    projectId: 'proj-1',
    name: 'Configuración de Base de Datos',
    description: 'Configurar la base de datos para la aplicación.',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'user-5', // Luis Martínez
    dueDate: '2024-06-30',
    createdAt: '2024-05-01',
  },
  {
    id: 'task-4',
    projectId: 'proj-2',
    name: 'Auditoría de Contenido Existente',
    description: 'Revisar y catalogar el contenido actual de la web.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'user-2', // María López
    dueDate: '2024-07-30',
    createdAt: '2024-04-05',
  },
  {
    id: 'task-5',
    projectId: 'proj-4',
    name: 'Creación de Creativos para Redes',
    description: 'Diseñar imágenes y videos para la campaña.',
    status: 'completed',
    priority: 'high',
    assignedTo: 'user-4', // Ana Fernández
    dueDate: '2024-01-10',
    createdAt: '2023-11-15',
  },
  {
    id: 'task-6',
    projectId: 'proj-4',
    name: 'Programación de Publicaciones',
    description: 'Programar las publicaciones en Facebook e Instagram.',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'user-2', // María López
    dueDate: '2024-01-25',
    createdAt: '2023-12-01',
  },
];

// Recalcular stats iniciales basadas en initialTasks para los proyectos
// Esto asegura que tasksCount y completedTasksCount estén correctos al inicio
initialProjects.forEach(project => {
  const projectTasks = initialTasks.filter(task => task.projectId === project.id);
  project.tasksCount = projectTasks.length;
  project.completedTasksCount = projectTasks.filter(task => task.status === 'completed').length;
  project.progress = project.tasksCount > 0
    ? Math.round((project.completedTasksCount / project.tasksCount) * 100)
    : 0;
});


// --- Carga y guarda datos de/a localStorage ---

const loadData = <T>(key: string, initialData: T[]): T[] => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialData;
  } catch (error) {
    console.error(`Error loading data from localStorage for key "${key}":`, error);
    // En caso de error (ej. JSON corrupto), se retorna la data inicial
    return initialData;
  }
};

const saveData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage for key "${key}":`, error);
  }
};

// Variables exportadas que se actualizarán y persistirán
export let users: User[] = loadData('users', initialUsers);
export let projects: Project[] = loadData('projects', initialProjects);
export let tasks: Task[] = loadData('tasks', initialTasks);


// --- Funciones de Utilidad y CRUD ---

// Proyectos
export const addProject = (data: NewProjectData): Project => {
    const newProject: Project = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
        teamMembers: data.teamMembers, // <--- Aquí se asignan los teamMembers
        progress: 0,
        tasksCount: 0,
        completedTasksCount: 0
    };
    projects.push(newProject);
    saveData('projects', projects);
    return newProject;
};

export const updateProject = (updatedProject: Project): boolean => {
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
        projects[index] = updatedProject;
        saveData('projects', projects);
        return true;
    }
    return false;
};

export const deleteProject = (id: string): boolean => {
    const initialProjectsLength = projects.length;
    projects = projects.filter(p => p.id !== id); // Filtra el proyecto
    tasks = tasks.filter(t => t.projectId !== id); // Elimina todas las tareas asociadas
    saveData('projects', projects);
    saveData('tasks', tasks);
    return projects.length < initialProjectsLength;
};

export const getProjectById = (id: string): Project | undefined => {
    return projects.find(p => p.id === id);
};


// Tareas
export const addTask = (data: NewTaskData): Task => {
    const newTask: Task = {
        id: uuidv4(),
        createdAt: new Date().toISOString().slice(0, 10), // Fecha actual YYYY-MM-DD
        ...data,
    };
    tasks.push(newTask);
    saveData('tasks', tasks);
    recalculateProjectStats(newTask.projectId); // Recalcula el progreso del proyecto
    return newTask;
};

export const updateTask = (updatedTask: Task): boolean => {
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = updatedTask;
        saveData('tasks', tasks);
        recalculateProjectStats(updatedTask.projectId); // Recalcula el progreso del proyecto
        return true;
    }
    return false;
};

export const deleteTask = (id: string): boolean => {
    const initialTasksLength = tasks.length;
    const taskToDelete = tasks.find(t => t.id === id);
    tasks = tasks.filter(t => t.id !== id);
    saveData('tasks', tasks);
    if (taskToDelete) {
        recalculateProjectStats(taskToDelete.projectId); // Recalcula el progreso del proyecto
    }
    return tasks.length < initialTasksLength;
};

export const getTasksByProjectId = (projectId: string): Task[] => {
    return tasks.filter(t => t.projectId === projectId);
};


// Usuarios
export const addUser = (data: Omit<User, 'id'>): User => {
    const newUser: User = {
        id: uuidv4(),
        ...data,
    };
    users.push(newUser);
    saveData('users', users);
    return newUser;
};

export const updateUser = (updatedUser: User): boolean => {
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;
        saveData('users', users);
        return true;
    }
    return false;
};

export const deleteUser = (id: string): boolean => {
    const initialUsersLength = users.length;
    users = users.filter(u => u.id !== id);
    // Opcional: Asignar tareas a un usuario por defecto o eliminarlas si un usuario se elimina
    // tasks = tasks.map(t => t.assignedTo === id ? { ...t, assignedTo: 'unassigned-user-id' } : t);
    saveData('users', users);
    return users.length < initialUsersLength;
};

export const getUserById = (id: string): User | undefined => {
    return users.find(u => u.id === id);
};


// --- Funciones para el Dashboard ---

// Calcula el progreso de un proyecto basado en sus tareas
export const recalculateProjectStats = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const projectTasks = tasks.filter(t => t.projectId === projectId);
        project.tasksCount = projectTasks.length;
        project.completedTasksCount = projectTasks.filter(t => t.status === 'completed').length;
        project.progress = project.tasksCount > 0
            ? Math.round((project.completedTasksCount / project.tasksCount) * 100)
            : 0;
        saveData('projects', projects); // Guarda el proyecto actualizado
    }
};

export const getDashboardStats = () => {
    const proyectosActivos = projects.filter(p => p.status === 'active' || p.status === 'on-hold' || p.status === 'pending').length;
    const tareasPendientes = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress' || t.status === 'blocked').length;
    const miembrosEquipo = users.filter(u => u.status === 'active').length;
    return {
        proyectosActivos,
        tareasPendientes,
        miembrosEquipo,
    };
};