
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, Task, Project, users as allUsersData, projects as allProjectsData } from '../utils/data';
import { useTasks } from '../hooks/useTasks'; 
import { useUsers } from '../hooks/useUsers'; 

import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/specific/TaskForm';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  const { users, getUserById: getUserByIdFromContext } = useUsers();
  const { tasks, addTask, getTasksByProjectId } = useTasks();
  const project = id ? getProjectById(id) : undefined;
  const projectTasks = id ? getTasksByProjectId(id) : [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(newTaskData);
    setIsModalOpen(false);
  };

  if (!project) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-lg min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Proyecto no encontrado</h2>
        <p className="text-gray-600 mb-6">Parece que el proyecto que buscas no existe.</p>
        <Button onClick={() => navigate('/projects')} iconLeft={<FaArrowLeft />}>
          Volver a Proyectos
        </Button>
      </div>
    );
  }

  const renderStatus = (status: Project['status'] | Task['status']): React.ReactNode => {
    let variant: 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'primary' = 'secondary';
    switch (status) {
      case 'active': case 'in-progress': variant = 'info'; break;
      case 'completed': variant = 'success'; break;
      case 'on-hold': case 'pending': variant = 'warning'; break;
      case 'blocked': variant = 'danger'; break;
    }
    return <Badge variant={variant} text={status.replace('-', ' ').toUpperCase()} />;
  };

  const getAssigneeName = (userId: string): string => {
    const user = getUserByIdFromContext(userId);
    return user ? user.name : 'Sin asignar';
  };

  const getProjectName = (projectId: string): string => {
    const proj = allProjectsData.find(p => p.id === projectId);
    return proj ? proj.name : 'Proyecto Desconocido';
  };


  const taskColumns = React.useMemo(() => [
    { header: 'Tarea', accessor: (row: Task) => row.name, className: 'font-medium text-gray-900 max-w-[250px] truncate' },
    { header: 'Estado', accessor: (row: Task) => renderStatus(row.status), className: 'w-auto' },
    {
      header: 'Prioridad',
      accessor: (row: Task): React.ReactNode => (
        <span className={`font-semibold ${row.priority === 'high' ? 'text-danger' : row.priority === 'medium' ? 'text-warning' : 'text-gray-600'}`}>
          {row.priority.toUpperCase()}
        </span>
      ),
      className: 'w-24'
    },
    { header: 'Asignado a', accessor: (row: Task) => getAssigneeName(row.assignedTo), className: 'text-gray-700 max-w-[150px] truncate' },
    { header: 'Fecha Límite', accessor: (row: Task) => row.dueDate, className: 'text-gray-600 w-28' },
  ], [projectTasks, users]); 

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/projects')} iconLeft={<FaArrowLeft />} className="mr-4">
          <span className="text-lg">Volver</span>
        </Button>
        <h2 className="text-3xl font-bold text-gray-800">{project.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white-ish p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Información General</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Estado</p>
              {renderStatus(project.status)}
            </div>
            <div>
              <p className="text-gray-500">Progreso</p>
              <ProgressBar value={project.progress} color={project.progress === 100 ? 'success' : 'primary'} className="mt-1" />
              <span className="text-sm text-gray-700 mt-1 block">{project.progress}% Completado</span>
            </div>
            <div>
              <p className="text-gray-500">Fecha de Inicio</p>
              <span className="font-medium text-gray-700">{project.startDate}</span>
            </div>
            <div>
              <p className="text-gray-500">Fecha de Finalización</p>
              <span className="font-medium text-gray-700">{project.endDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Equipo del Proyecto</h3>
          <ul className="space-y-3">
            {project.teamMembers.map(memberId => {
              const member = getUserByIdFromContext(memberId);
              return (
                <li key={memberId} className="flex items-center text-gray-700">
                  <img src={member?.avatarUrl} alt={member?.name} className="w-8 h-8 rounded-full mr-3 border border-gray-300" />
                  <span className="font-medium">{member?.name}</span>
                  <Badge text={member?.role.toUpperCase() || ''} variant="secondary" className="ml-2" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Tareas del Proyecto ({projectTasks.length})</h3>
        <Button iconLeft={<FaPlus />} onClick={() => setIsModalOpen(true)}>
          Añadir Tarea
        </Button>
      </div>
      <Table
        data={projectTasks}
        columns={taskColumns}
        emptyMessage="No hay tareas para este proyecto."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Añadir Tarea a "${project.name}"`}
      >
        <TaskForm onSubmit={handleAddTask} onCancel={() => setIsModalOpen(false)} initialProjectId={project.id} />
      </Modal>
    </div>
  );
}

export default ProjectDetailPage;