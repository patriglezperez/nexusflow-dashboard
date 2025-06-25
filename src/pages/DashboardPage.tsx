import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../contexts/AuthContext';
import Badge from '../components/ui/Badge';
import { Project, Task } from '../utils/data';

function DashboardPage() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { tasks } = useTasks();

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

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-8"></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Proyectos Activos */}
        <Link to="/projects">
          <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200
                      transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary">
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


        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200 flex flex-col 
                    transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary">
          <Link to="/tasks" className="block"> 
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tareas Pendientes</h3>
            <p className="text-5xl font-extrabold text-warning mb-4">{userPendingTasks.length}</p>
          </Link>
          
          <div className=" pt-4 border-t border-gray-200 overflow-y-auto max-h-[250px]">
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

        <Link to="/users">
          <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200
                      transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Miembros del Equipo</h3>
            <p className="text-5xl font-extrabold text-success">{teamMembersCount}</p>
          </div>
        </Link>
      </div>

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
    </div>
  );
}

export default DashboardPage;