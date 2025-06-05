import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { Task } from '../../utils/data'; 
import { useUsers } from '../../hooks/useUsers'; 

import { projects as allProjectsData } from '../../utils/data'; 

interface TaskFormProps {
  onSubmit: (newTask: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialProjectId?: string; 
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialProjectId }) => {
  const { users } = useUsers(); 
  const projects = allProjectsData; 

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(initialProjectId || (projects.length > 0 ? projects[0].id : ''));
  const [assignedTo, setAssignedTo] = useState(users.length > 0 ? users[0].id : '');
  const [status, setStatus] = useState<Task['status']>('pending');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');


  React.useEffect(() => {
    if (projects.length > 0 && !projectId) {
      setProjectId(projects[0].id);
    }
  }, [projects, projectId]);

  React.useEffect(() => {
    if (users.length > 0 && !assignedTo) {
      setAssignedTo(users[0].id);
    }
  }, [users, assignedTo]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !projectId || !assignedTo || !dueDate) {
      alert('Por favor, completa todos los campos obligatorios: Nombre, Descripción, Proyecto, Asignado a, y Fecha Límite.');
      return;
    }

    onSubmit({
      name,
      description,
      projectId,
      assignedTo,
      status,
      priority,
      dueDate,
    });


    setName('');
    setDescription('');
    setProjectId(projects.length > 0 ? projects[0].id : '');
    setAssignedTo(users.length > 0 ? users[0].id : '');
    setStatus('pending');
    setPriority('medium');
    setDueDate('');
  };

  const projectOptions = projects.map(p => ({ value: p.id, label: p.name }));
  const userOptions = users.map(u => ({ value: u.id, label: u.name }));
  const statusOptions = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'in-progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completada' },
    { value: 'blocked', label: 'Bloqueada' },
  ];
  const priorityOptions = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Nombre de la Tarea" htmlFor="taskName">
        <Input
          id="taskName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Descripción" htmlFor="taskDescription">
        <textarea
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-150 ease-in-out"
          rows={3}
          required
        ></textarea>
      </FormField>

      <FormField label="Proyecto" htmlFor="taskProject">
        <Select id="taskProject" options={projectOptions} value={projectId} onChange={(e) => setProjectId(e.target.value)} required />
      </FormField>

      <FormField label="Asignado a" htmlFor="taskAssignee">
        <Select id="taskAssignee" options={userOptions} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Estado" htmlFor="taskStatus">
          <Select id="taskStatus" options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value as Task['status'])} required />
        </FormField>
        <FormField label="Prioridad" htmlFor="taskPriority">
          <Select id="taskPriority" options={priorityOptions} value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])} required />
        </FormField>
      </div>

      <FormField label="Fecha Límite" htmlFor="taskDueDate">
        <Input id="taskDueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </FormField>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Añadir Tarea
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;