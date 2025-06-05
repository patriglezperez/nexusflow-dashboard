// src/pages/TasksPage.tsx
import React, { useState } from 'react'; // Importa useState
import { Task } from '../utils/data'; // Solo importamos el tipo Task
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal'; // Importa el Modal
import TaskForm from '../components/specific/TaskForm'; // Importa el TaskForm
import { useTasks } from '../hooks/useTasks'; // ¡CAMBIO CLAVE! Importa useTasks desde hooks/
import { useUsers } from '../hooks/useUsers'; // Importa useUsers desde hooks/
import { useProjects } from '../hooks/useProjects'; // Importa useProjects desde hooks/
import { FaPlus } from 'react-icons/fa';

function TasksPage() {
  const { tasks, addTask } = useTasks(); // Usa el hook para obtener y añadir tareas
  const { getUserById } = useUsers(); // Para obtener nombres de usuarios
  const { getProjectById } = useProjects(); // Para obtener nombres de proyectos

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(newTaskData);
    setIsModalOpen(false); // Cierra el modal después de añadir
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

  const getProjectName = (projectId: string): string => {
    const project = getProjectById(projectId);
    return project?.name || 'Proyecto Desconocido';
  };

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
  ], [tasks, getAssigneeName, getProjectName]);

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
        <TaskForm onSubmit={handleAddTask} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default TasksPage;