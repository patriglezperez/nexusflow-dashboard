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
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
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
  status: 'active' | 'inactive';
  avatarUrl: string;
}


export const users: User[] = [
  { id: 'usr-1', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'admin', status: 'active', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AJ&backgroundColor=4F46E5&fontColor=FFFFFF' },
  { id: 'usr-2', name: 'Bob Williams', email: 'bob.w@example.com', role: 'manager', status: 'active', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=BW&backgroundColor=10B981&fontColor=FFFFFF' },
  { id: 'usr-3', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'developer', status: 'active', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=CB&backgroundColor=F59E0B&fontColor=FFFFFF' },
  { id: 'usr-4', name: 'Diana Prince', email: 'diana.p@example.com', role: 'designer', status: 'active', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DP&backgroundColor=3B82F6&fontColor=FFFFFF' },
  { id: 'usr-5', name: 'Eve Davis', email: 'eve.d@example.com', role: 'developer', status: 'inactive', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=ED&backgroundColor=EF4444&fontColor=FFFFFF' },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Rediseño de la Web Corporativa',
    description: 'Actualización completa de la interfaz de usuario y la experiencia del sitio web principal.',
    status: 'active',
    progress: 75,
    startDate: '2025-01-15',
    endDate: '2025-07-30',
    teamMembers: ['usr-1', 'usr-2', 'usr-4'],
    tasksCount: 10,
    completedTasksCount: 7,
  },
  {
    id: 'proj-2',
    name: 'Desarrollo de App Móvil para Clientes',
    description: 'Creación de una nueva aplicación móvil nativa para iOS y Android.',
    status: 'on-hold',
    progress: 40,
    startDate: '2025-03-01',
    endDate: '2025-11-15',
    teamMembers: ['usr-2', 'usr-3', 'usr-5'],
    tasksCount: 15,
    completedTasksCount: 6,
  },
  {
    id: 'proj-3',
    name: 'Implementación de CRM Interno',
    description: 'Integración de un nuevo sistema CRM para la gestión de relaciones con clientes.',
    status: 'pending',
    progress: 10,
    startDate: '2025-06-01',
    endDate: '2026-01-31',
    teamMembers: ['usr-1', 'usr-2', 'usr-3'],
    tasksCount: 8,
    completedTasksCount: 1,
  },
  {
    id: 'proj-4',
    name: 'Optimización de Bases de Datos',
    description: 'Mejora del rendimiento y la estructura de las bases de datos existentes.',
    status: 'completed',
    progress: 100,
    startDate: '2024-09-01',
    endDate: '2025-02-28',
    teamMembers: ['usr-3'],
    tasksCount: 5,
    completedTasksCount: 5,
  },
  {
    id: 'proj-5',
    name: 'Campaña de Marketing Digital Q3',
    description: 'Planificación y ejecución de la campaña de marketing digital para el tercer trimestre.',
    status: 'on-hold',
    progress: 25,
    startDate: '2025-07-01',
    endDate: '2025-09-30',
    teamMembers: ['usr-1', 'usr-4'],
    tasksCount: 7,
    completedTasksCount: 2,
  },
];

export const tasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    name: 'Diseño de la página de inicio',
    description: 'Crear mockups y prototipos de alta fidelidad para la nueva página de inicio.',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'usr-4',
    dueDate: '2025-06-15',
    createdAt: '2025-05-20',
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    name: 'Desarrollo del Frontend de la página de inicio',
    description: 'Implementar el diseño de la página de inicio usando React y Tailwind.',
    status: 'pending',
    priority: 'high',
    assignedTo: 'usr-3',
    dueDate: '2025-06-30',
    createdAt: '2025-05-25',
  },
  {
    id: 'task-3',
    projectId: 'proj-2',
    name: 'Investigación de SDKs de terceros',
    description: 'Explorar SDKs para notificaciones push y análisis de datos.',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'usr-5',
    dueDate: '2025-05-10',
    createdAt: '2025-04-10',
  },
  {
    id: 'task-4',
    projectId: 'proj-2',
    name: 'Configuración de entorno de desarrollo móvil',
    description: 'Preparar el entorno de desarrollo con XCode, Android Studio y React Native.',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'usr-3',
    dueDate: '2025-06-20',
    createdAt: '2025-06-01',
  },
  {
    id: 'task-5',
    projectId: 'proj-1',
    name: 'Reunión de Feedback UX',
    description: 'Recopilar feedback de los stakeholders sobre los diseños iniciales.',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'usr-1',
    dueDate: '2025-05-28',
    createdAt: '2025-05-26',
  },
  {
    id: 'task-6',
    projectId: 'proj-3',
    name: 'Análisis de requisitos de CRM',
    description: 'Documentar los requisitos funcionales y no funcionales del nuevo CRM.',
    status: 'pending',
    priority: 'high',
    assignedTo: 'usr-2',
    dueDate: '2025-06-25',
    createdAt: '2025-06-05',
  },
  {
    id: 'task-7',
    projectId: 'proj-1',
    name: 'Integración de API de autenticación',
    description: 'Conectar el frontend con la API de autenticación para el login de usuarios.',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'usr-3',
    dueDate: '2025-07-10',
    createdAt: '2025-06-01',
  },
  {
    id: 'task-8',
    projectId: 'proj-4',
    name: 'Revisión final de querys de BD',
    description: 'Última revisión del rendimiento de las consultas SQL.',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'usr-3',
    dueDate: '2025-02-20',
    createdAt: '2025-02-15',
  },
  {
    id: 'task-9',
    projectId: 'proj-2',
    name: 'Diseño de arquitectura de base de datos móvil',
    description: 'Definir el esquema de la base de datos para la aplicación móvil.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'usr-5',
    dueDate: '2025-07-05',
    createdAt: '2025-06-10',
  },
  {
    id: 'task-10',
    projectId: 'proj-5',
    name: 'Creación de activos visuales para campaña',
    description: 'Diseñar banners, imágenes para redes sociales y otros elementos gráficos.',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'usr-4',
    dueDate: '2025-07-15',
    createdAt: '2025-06-01',
  },
];

export const getProjectById = (id: string) => projects.find(p => p.id === id);
export const getTasksByProjectId = (projectId: string) => tasks.filter(t => t.projectId === projectId);
export const getUserById = (id: string) => users.find(u => u.id === id);
export const getTasksAssignedToUser = (userId: string) => tasks.filter(t => t.assignedTo === userId);

