import React, { useState, useCallback } from 'react';
import { Task } from '../utils/data';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/specific/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { useUsers } from '../hooks/useUsers';
import { useProjects } from '../hooks/useProjects';
import { FaPlus, FaFilter, FaTimes } from 'react-icons/fa';
import Select from '../components/ui/Select';
import FormField from '../components/ui/FormField';
import Input from '../components/ui/Input';

const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = React.useRef<number | null>(null);

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

function TasksPage() {
  const { tasks, addTask } = useTasks();
  const { getUserById, users } = useUsers();
  const { projects } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignedTo, setFilterAssignedTo] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSetSearchTerm = useDebounce(setSearchTerm, 300);

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(newTaskData);
    setIsModalOpen(false);
  };

  const renderStatus = (status: Task['status']): React.ReactNode => {
    let variant: 'info' | 'success' | 'warning' | 'danger' | 'secondary' = 'secondary';
    switch (status) {
      case 'progress': variant = 'info'; break;
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
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Proyecto Desconocido';
  };

  const statusFilterOptions = [
    { value: 'all', label: 'Todos los Estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completada' },
    { value: 'blocked', label: 'Bloqueada' },
  ];

  const assignedToFilterOptions = React.useMemo(() => [
    { value: 'all', label: 'Todos los Usuarios' },
    ...users.map(u => ({ value: u.id, label: u.name })),
  ], [users]);

  const projectFilterOptions = React.useMemo(() => [
    { value: 'all', label: 'Todos los Proyectos' },
    ...projects.map(p => ({ value: p.id, label: p.name })),
  ], [projects]);

  const handleClearFilters = () => {
    setFilterStatus('all');
    setFilterAssignedTo('all');
    setFilterProject('all');
    setSearchTerm('');
    const searchInput = document.getElementById('taskSearch') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    setShowFilters(false);
  };

  const filteredTasks = React.useMemo(() => {
    let currentFilteredTasks = tasks;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFilteredTasks = currentFilteredTasks.filter(task =>
        task.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        task.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (filterStatus !== 'all') {
      currentFilteredTasks = currentFilteredTasks.filter(task => task.status === filterStatus);
    }
    if (filterAssignedTo !== 'all') {
      currentFilteredTasks = currentFilteredTasks.filter(task => task.assignedTo === filterAssignedTo);
    }
    if (filterProject !== 'all') {
      currentFilteredTasks = currentFilteredTasks.filter(task => task.projectId === filterProject);
    }

    return currentFilteredTasks;
  }, [tasks, searchTerm, filterStatus, filterAssignedTo, filterProject]);

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
    { header: 'Creada', accessor: (row: Task) => row.createdAt, className: 'text-gray-500 w-28' },
  ], [getAssigneeName, getProjectName, projects]);

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Todas las Tareas</h2>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            iconLeft={<FaFilter />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
          <Button iconLeft={<FaPlus />} onClick={() => setIsModalOpen(true)}>
            Nueva Tarea
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200 mb-6">
          <div className="flex items-center text-gray-700 mb-4 pb-4 border-b border-gray-200">
            <FaFilter className="mr-3 text-xl text-primary" />
            <h3 className="text-xl font-semibold">Filtros de Tareas</h3>
            {(filterStatus !== 'all' || filterAssignedTo !== 'all' || filterProject !== 'all' || searchTerm) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="ml-auto text-primary hover:bg-primary/10"
                iconLeft={<FaTimes />}
              >
                Limpiar Filtros
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 mb-4">
            <FormField label="Buscar por nombre/descripción" htmlFor="taskSearch">
              <Input
                id="taskSearch"
                type="text"
                placeholder="Buscar tarea..."
                onChange={(e) => debouncedSetSearchTerm(e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField label="Filtrar por Estado" htmlFor="filterStatus">
              <Select
                id="filterStatus"
                options={statusFilterOptions}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
            </FormField>
            <FormField label="Filtrar por Asignado" htmlFor="filterAssignedTo">
              <Select
                id="filterAssignedTo"
                options={assignedToFilterOptions}
                value={filterAssignedTo}
                onChange={(e) => setFilterAssignedTo(e.target.value)}
              />
            </FormField>
            <FormField label="Filtrar por Proyecto" htmlFor="filterProject">
              <Select
                id="filterProject"
                options={projectFilterOptions}
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
              />
            </FormField>
          </div>

          {(filterStatus !== 'all' || filterAssignedTo !== 'all' || filterProject !== 'all' || searchTerm) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-gray-600 font-medium mr-2">Filtros Activos:</span>
              {searchTerm && <Badge text={`Búsqueda: "${searchTerm}"`} variant="secondary" className="mr-2 mb-1" />}
              {filterStatus !== 'all' && <Badge text={`Estado: ${statusFilterOptions.find(opt => opt.value === filterStatus)?.label}`} variant="secondary" className="mr-2 mb-1" />}
              {filterAssignedTo !== 'all' && <Badge text={`Asignado: ${assignedToFilterOptions.find(opt => opt.value === filterAssignedTo)?.label}`} variant="secondary" className="mr-2 mb-1" />}
              {filterProject !== 'all' && <Badge text={`Proyecto: ${projectFilterOptions.find(opt => opt.value === filterProject)?.label}`} variant="secondary" className="mr-2 mb-1" />}
            </div>
          )}
        </div>
      )}

      <Table
        data={filteredTasks}
        columns={columns}
        emptyMessage="No hay tareas registradas que coincidan con los filtros."
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