import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'pending';
  progress: number; 
  startDate: string; 
  endDate: string;  
  teamMembers: string[]; 
  tasksCount: number;
  completedTasksCount: number; 
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: 'pending' | 'progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: string; 
  createdAt: string; 
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'developer' | 'designer';
  avatarUrl: string;
  status: 'active' | 'inactive';
}

export type NewProjectData = Omit<Project, 'id' | 'progress' | 'tasksCount' | 'completedTasksCount'>;
export type NewTaskData = Omit<Task, 'id' | 'createdAt'>;

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
  // --- NUEVOS PROYECTOS ---
  {
    id: 'proj-5',
    name: 'Optimización de Base de Datos',
    description: 'Mejorar el rendimiento y la escalabilidad de la base de datos principal.',
    status: 'active',
    progress: 60,
    startDate: '2024-04-01',
    endDate: '2024-08-31',
    teamMembers: ['user-3', 'user-5'],
    tasksCount: 0,
    completedTasksCount: 0,
  },
  {
    id: 'proj-6',
    name: 'Desarrollo de Módulo de Informes',
    description: 'Creación de un nuevo módulo de informes personalizables para clientes.',
    status: 'pending',
    progress: 25,
    startDate: '2024-05-10',
    endDate: '2024-11-30',
    teamMembers: ['user-1', 'user-3', 'user-2'],
    tasksCount: 0,
    completedTasksCount: 0,
  },
  {
    id: 'proj-7',
    name: 'Auditoría de Seguridad de la Red',
    description: 'Análisis exhaustivo de la infraestructura de red para identificar vulnerabilidades.',
    status: 'pending',
    progress: 0,
    startDate: '2024-07-15',
    endDate: '2024-10-31',
    teamMembers: ['user-1'],
    tasksCount: 0,
    completedTasksCount: 0,
  },
  {
    id: 'proj-8',
    name: 'Actualización de Documentación Interna',
    description: 'Revisión y actualización de toda la documentación técnica y de procesos internos.',
    status: 'completed',
    progress: 100,
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    teamMembers: ['user-4', 'user-2'],
    tasksCount: 0,
    completedTasksCount: 0,
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
    assignedTo: 'user-4', 
    dueDate: '2024-02-28',
    createdAt: '2024-01-20',
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    name: 'Desarrollo Frontend Login',
    description: 'Implementar la pantalla de login y registro.',
    status: 'progress',
    priority: 'high',
    assignedTo: 'user-3', 
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
    assignedTo: 'user-5', 
    dueDate: '2024-06-30',
    createdAt: '2024-05-01',
  },
  {
    id: 'task-4',
    projectId: 'proj-2',
    name: 'Auditoría de Contenido Existente',
    description: 'Revisar y catalogar el contenido actual de la web.',
    status: 'progress',
    priority: 'medium',
    assignedTo: 'user-2', 
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
    assignedTo: 'user-4', 
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
    assignedTo: 'user-2',
    dueDate: '2024-01-25',
    createdAt: '2023-12-01',
  },
  // --- TAREAS ADICIONALES PARA LOS NUEVOS PROYECTOS ---
  {
    id: 'task-7',
    projectId: 'proj-5',
    name: 'Optimizar consultas SQL',
    description: 'Identificar y mejorar consultas lentas en la base de datos.',
    status: 'progress',
    priority: 'high',
    assignedTo: 'user-3',
    dueDate: '2024-07-15',
    createdAt: '2024-05-05',
  },
  {
    id: 'task-8',
    projectId: 'proj-5',
    name: 'Limpiar datos históricos',
    description: 'Archivar o eliminar datos antiguos para mejorar el rendimiento.',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'user-5',
    dueDate: '2024-06-10',
    createdAt: '2024-05-20',
  },
  {
    id: 'task-9',
    projectId: 'proj-6',
    name: 'Diseño de UI para reportes',
    description: 'Crear maquetas y diseños para el nuevo módulo de informes.',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'user-4',
    dueDate: '2024-07-20',
    createdAt: '2024-05-15',
  },
  {
    id: 'task-10',
    projectId: 'proj-6',
    name: 'Implementar lógica de filtrado',
    description: 'Desarrollar la funcionalidad de filtrado de datos en el frontend del módulo.',
    status: 'progress',
    priority: 'high',
    assignedTo: 'user-3',
    dueDate: '2024-08-15',
    createdAt: '2024-06-01',
  },
  {
    id: 'task-11',
    projectId: 'proj-7',
    name: 'Escanear puertos de la red',
    description: 'Realizar un escaneo de puertos para identificar servicios expuestos.',
    status: 'pending',
    priority: 'high',
    assignedTo: 'user-1',
    dueDate: '2024-08-01',
    createdAt: '2024-07-16',
  },
  {
    id: 'task-12',
    projectId: 'proj-8',
    name: 'Revisar documentación de API',
    description: 'Actualizar la documentación de todos los endpoints de la API.',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'user-2',
    dueDate: '2024-03-20',
    createdAt: '2024-02-10',
  },
];


initialProjects.forEach(project => {
  const projectTasks = initialTasks.filter(task => task.projectId === project.id);
  project.tasksCount = projectTasks.length;
  project.completedTasksCount = projectTasks.filter(task => task.status === 'completed').length;
  project.progress = project.tasksCount > 0
    ? Math.round((project.completedTasksCount / project.tasksCount) * 100)
    : 0;
});




const loadData = <T>(key: string, initialData: T[]): T[] => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialData;
  } catch (error) {
    console.error(`Error loading data from localStorage for key "${key}":`, error);
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


export let users: User[] = loadData('users', initialUsers);
export let projects: Project[] = loadData('projects', initialProjects);
export let tasks: Task[] = loadData('tasks', initialTasks);



export const addProject = (data: NewProjectData): Project => {
    const newProject: Project = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
        teamMembers: data.teamMembers, 
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
    projects = projects.filter(p => p.id !== id); 
    tasks = tasks.filter(t => t.projectId !== id); 
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
        createdAt: new Date().toISOString().slice(0, 10),
        ...data,
    };
    tasks.push(newTask);
    saveData('tasks', tasks);
    recalculateProjectStats(newTask.projectId); 
    return newTask;
};

export const updateTask = (updatedTask: Task): boolean => {
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = updatedTask;
        saveData('tasks', tasks);
        recalculateProjectStats(updatedTask.projectId); 
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
        recalculateProjectStats(taskToDelete.projectId); 
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
  
    saveData('users', users);
    return users.length < initialUsersLength;
};

export const getUserById = (id: string): User | undefined => {
    return users.find(u => u.id === id);
};



export const recalculateProjectStats = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const projectTasks = tasks.filter(t => t.projectId === projectId);
        project.tasksCount = projectTasks.length;
        project.completedTasksCount = projectTasks.filter(t => t.status === 'completed').length;
        project.progress = project.tasksCount > 0
            ? Math.round((project.completedTasksCount / project.tasksCount) * 100)
            : 0;
        saveData('projects', projects); 
    }
};

export const getDashboardStats = () => {
    const proyectosActivos = projects.filter(p => p.status === 'active' || p.status === 'on-hold' || p.status === 'pending').length;
    const tareasPendientes = tasks.filter(t => t.status === 'pending' || t.status === 'progress' || t.status === 'blocked').length;
    const miembrosEquipo = users.filter(u => u.status === 'active').length;
    return {
        proyectosActivos,
        tareasPendientes,
        miembrosEquipo,
    };
};