import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../hooks/useUsers';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Project, Task, User } from '../utils/data';

const DASHBOARD_PREFS_KEY = 'dashboard_preferences';

function DashboardPage() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { users, getUserById } = useUsers();

  const [dashboardPrefs, setDashboardPrefs] = useState({
    showProjects: true,
    showTasks: true,
    showMembers: true,
    showRecentActivity: true,
  });

  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem(DASHBOARD_PREFS_KEY);
      if (savedPrefs) {
        setDashboardPrefs(JSON.parse(savedPrefs));
      }
    } catch (error) {
      console.error("Error al cargar preferencias del dashboard desde localStorage:", error);
    }
  }, []);

  const activeProjectsCount = projects.filter(p => p.status === 'active' || p.status === 'on-hold' || p.status === 'pending').length;
  const pendingTasksCount = 10;
  const teamMembersCount = 5;
  const totalProjects = projects.length;

  const projectStats = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<Project['status'], number>);

  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'info';
      case 'completed': return 'success';
      case 'on-hold': return 'warning';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const userPendingTasks = tasks.filter(task =>
    task.assignedTo === user?.id && (task.status === 'pending' || task.status === 'progress' || task.status === 'blocked')
  ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const renderTaskStatus = (status: Task['status']): React.ReactNode => {
    let variant: 'info' | 'success' | 'warning' | 'danger' | 'secondary' = 'secondary';
    switch (status) {
      case 'progress': variant = 'info'; break;
      case 'completed': variant = 'success'; break;
      case 'pending': variant = 'warning'; break;
      case 'blocked': variant = 'danger'; break;
    }
    return <Badge variant={variant} text={status.replace('-', ' ').toUpperCase()} />;
  };

  const renderPriority = (priority: Task['priority']): React.ReactNode => {
    let colorClass = 'text-gray-600';
    if (priority === 'high') colorClass = 'text-danger';
    else if (priority === 'medium') colorClass = 'text-warning';
    return <span className={`font-semibold ${colorClass}`}>{priority.toUpperCase()}</span>;
  };

  const collaboratingMembers = React.useMemo(() => {
    if (!user) return [];
    const userActiveProjects = projects.filter(p => p.teamMembers.includes(user.id) && (p.status === 'active' || p.status === 'on-hold' || p.status === 'pending'));
    const memberIds = new Set<string>();
    userActiveProjects.forEach(p => {
      p.teamMembers.forEach(memberId => {
        if (memberId !== user.id) {
          memberIds.add(memberId);
        }
      });
    });
    return Array.from(memberIds).map(id => getUserById(id)).filter((m): m is User => m !== undefined);
  }, [projects, user, getUserById]);

  const renderRole = (role: User['role']): React.ReactNode => {
    let variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' = 'secondary';
    switch (role) {
      case 'admin': variant = 'primary'; break;
      case 'manager': variant = 'info'; break;
      case 'developer': variant = 'success'; break;
      case 'designer': variant = 'warning'; break;
    }
    return <Badge variant={variant} text={role.toUpperCase()} className="ml-2" />;
  };

 
  const allCardsHidden = !dashboardPrefs.showProjects && !dashboardPrefs.showTasks && !dashboardPrefs.showMembers && !dashboardPrefs.showRecentActivity;

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-8"></h2>
      

      {allCardsHidden ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-600 p-8 rounded-xl bg-white-ish border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.a1.724 1.724 0 002.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-xl font-semibold mb-2">¡Tu dashboard está vacío!</p>
          <p className="mb-4">Parece que todas las secciones del dashboard están ocultas.</p>
          <Link to="/settings">
            <Button variant="primary">
              Visita Configuración para personalizarlo
            </Button>
          </Link>
        </div>
      ) : (
        <>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 items-stretch">
            {dashboardPrefs.showProjects && (
              <Link to="/projects">
                <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200
                            transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary h-full">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Proyectos Activos</h3>
                  <p className="text-5xl font-extrabold text-primary mb-4">{activeProjectsCount}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-3 pl-2">Estado de Proyectos:</p>
                    <ul className="space-y-2">
                      {Object.entries(projectStats).map(([status, count]) => (
                        <li key={status} className="grid items-center py-1 rounded-md transition-all duration-200
                                                 hover:bg-gray-100 cursor-pointer
                                                 grid-cols-[auto_1fr_auto] gap-2">
                          <span className="flex items-center">
                            <Badge variant={getStatusVariant(status as Project['status'])} text={status.replace('-', ' ').toUpperCase()} className="mr-2 min-w-[100px]" />
                          </span>
                          <span className="text-sm text-gray-700 text-center">
                            <span className="font-semibold text-gray-800 mr-1">{count}</span>
                            {Number(count) === 1 ? 'proyecto' : 'proyectos'}
                          </span>
                          {totalProjects > 0 && (
                            <span className="text-sm text-gray-500 font-semibold text-right">
                              {((Number(count) / totalProjects) * 100).toFixed(0)}%
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {totalProjects === 0 && (
                      <p className="text-sm text-gray-500 py-1 px-2">No hay proyectos para mostrar estadísticas.</p>
                    )}
                  </div>
                </div>
              </Link>
            )}

            {dashboardPrefs.showTasks && (
              <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between
                          transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary h-full">
                <Link to="/tasks" className="block">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Tareas Pendientes</h3>
                  <p className="text-5xl font-extrabold text-warning mb-4">{userPendingTasks.length}</p>
                </Link>
                
                <div className="pt-4 border-t border-gray-200 overflow-y-auto max-h-[250px] flex-grow">
                  <p className="text-sm font-medium text-gray-600 mb-3">Mis tareas pendientes:</p>
                  {userPendingTasks.length > 0 ? (
                    <ul className="space-y-3">
                      {userPendingTasks.slice(0, 5).map(task => (
                        <li key={task.id} className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-gray-100">
                          <div className="flex-1 min-w-0">
                            <Link to={`/projects/${task.projectId}`} className="font-semibold text-gray-900 hover:text-primary hover:underline transition-colors truncate">
                              {task.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{task.dueDate}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      <p>¡Felicidades! No tienes tareas pendientes.</p>
                      <p>Tiempo de tomar un café ☕</p>
                    </div>
                  )}
                </div>
              
              </div>
            )}
       
            {dashboardPrefs.showMembers && (
              <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between
                          transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary h-full">
                <Link to="/users" className="block">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Miembros del Equipo</h3>
                  <p className="text-5xl font-extrabold text-success mb-4">{collaboratingMembers.length}</p>
                </Link>

                <div className="pt-4 border-t border-gray-200 overflow-y-auto max-h-[250px]">
                  <p className="text-sm font-medium text-gray-600 mb-3">Tus colaboradores:</p>
                  {collaboratingMembers.length > 0 ? (
                    <ul className="space-y-2">
                      {collaboratingMembers.slice(0, 3).map((member: User) => (
                        <li key={member.id} className="flex items-center text-gray-700 py-1">
                          <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full mr-3 border border-gray-300" />
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-medium truncate">{member.name}</span>
                            <span className="text-xs text-gray-500 truncate">{member.email}</span>
                          </div>
                          {renderRole(member.role)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      <p>No colaboras en proyectos activos.</p>
                    </div>
                  )}
                </div>
             
              </div>
            )}
          </div>
          {dashboardPrefs.showRecentActivity && (
            <div className="bg-white-ish p-6 rounded-2xl shadow-lg border border-gray-200 flex-1 mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Actividad Reciente</h3>
              <ul className="space-y-4">
                <li className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                  <span className="text-xl mr-4 text-primary">⚡</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Juan Pérez</span> ha actualizado el proyecto "Desarrollo de App Móvil".
                    <span className="text-sm text-gray-500 ml-2">Hace 5 min</span>
                  </p>
                </li>
                <li className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                  <span className="text-xl mr-4 text-success">✅</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Maria López</span> completó la tarea "Diseño de Interfaz de Usuario".
                    <span className="text-sm text-gray-500 ml-2">Hace 30 min</span>
                  </p>
                </li>
                <li className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                  <span className="text-xl mr-4 text-warning">⚠️</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Sistema</span>: Tarea "Reporte Financiero Q2" está próxima a vencer.
                    <span className="text-sm text-gray-500 ml-2">Hace 1 hora</span>
                  </p>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DashboardPage;