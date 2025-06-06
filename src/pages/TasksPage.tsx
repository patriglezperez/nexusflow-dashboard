// src/pages/TasksPage.tsx
import React, { useState } from 'react';
import { Task } from '../utils/data'; // Solo importamos el tipo Task
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/specific/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { useUsers } from '../hooks/useUsers';
import { useProjects } from '../hooks/useProjects'; // Importa useProjects desde hooks/
import { FaPlus } from 'react-icons/fa';

function TasksPage() {
  const { tasks, addTask } = useTasks();
  const { getUserById } = useUsers();
  // CORRECCIÓN: Desestructura solo 'projects' del hook useProjects
  const { projects } = useProjects(); // Para obtener nombres de proyectos

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(newTaskData);
    setIsModalOpen(false);
  };

  const renderStatus = (status: Task['status']): React.ReactNode => {
    let variant: 'info' | 'success' | 'warning' | 'danger' | 'secondary' = 'secondary';
    switch (status) {
      case 'in-progress': variant = 'info'; break;
      case 'completed': variant = 'success'; break;
      case 'pending': variant = 'warning'; break;
      case 'blocked': variant = 'danger'; break;
    }
    return <Badge variant={variant} text={status.replace('-', ' ').toUpperCase()} />;
  };

  const getAssigneeName = (userId: string): string => {
    const user = getUserById(userId);
    return user?.name || 'Sin asignar';
  };

  // CORRECCIÓN: Esta función ahora busca en el array 'projects'
  const getProjectName = (projectId: string): string => {
    const project = projects.find(p => p.id === projectId); // Busca el proyecto en el estado local
    return project?.name || 'Proyecto Desconocido';
  };

  // Importante: Añadir 'projects' como dependencia en useMemo
  const columns = React.useMemo(() => [
    {
      header: 'Tarea',
      accessor: (row: Task) => row.name,
      className: 'font-medium text-gray-900 max-w-[200px] truncate'
    },
    {
      header: 'Proyecto',
      accessor: (row: Task) => getProjectName(row.projectId),
      className: 'text-primary max-w-[180px] truncate'
    },
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
    {
      header: 'Asignado a',
      accessor: (row: Task) => getAssigneeName(row.assignedTo),
      className: 'text-gray-700 max-w-[150px] truncate'
    },
    { header: 'Fecha Límite', accessor: (row: Task) => row.dueDate, className: 'text-gray-600 w-28' },
    { header: 'Creada el', accessor: (row: Task) => row.createdAt, className: 'text-gray-500 w-28' },
  ], [tasks, getAssigneeName, getProjectName, projects]); // Asegúrate de incluir 'projects' aquí

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">

      <div className="mb-6 flex justify-end">
        <Button iconLeft={<FaPlus />} onClick={() => setIsModalOpen(true)}>
          Nueva Tarea
        </Button>
      </div>
      <Table
        data={tasks}
        columns={columns}
        emptyMessage="No hay tareas registradas."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Añadir Nueva Tarea"
      >
        {/* Asegúrate de que TaskForm pueda recibir initialProjectId si es necesario */}
        <TaskForm onSubmit={handleAddTask} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default TasksPage;