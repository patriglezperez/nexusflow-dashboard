import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select'; 
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { NewProjectData, users as allUsersData, Project } from '../../utils/data'; 

interface ProjectFormProps {
  initialData?: Project; 
  onSubmit?: (newProjectData: NewProjectData) => void; 
  onUpdate?: (updatedProject: Project) => void; 
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, onUpdate, onCancel }) => {

  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<Project['status']>(initialData?.status || 'active');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [teamMembers, setTeamMembers] = useState<string[]>(initialData?.teamMembers || []);

  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setTeamMembers(initialData.teamMembers);
    } else {
   
      setName('');
      setDescription('');
      setStatus('active');
      setStartDate('');
      setEndDate('');
      setTeamMembers([]);
    }
  }, [initialData]);

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'completed', label: 'Completado' },
    { value: 'on-hold', label: 'En Espera' },
    { value: 'pending', label: 'Pendiente' },
  ];

  const teamMemberOptions = allUsersData.map(user => ({ value: user.id, label: user.name }));

  const handleMembersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setTeamMembers(selectedOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !startDate || !endDate || teamMembers.length === 0) {
      alert('Por favor, completa todos los campos obligatorios: Nombre, Descripción, Fecha de Inicio, Fecha de Fin, y Miembros del Equipo.');
      return;
    }


    if (initialData) {

      const updatedProject: Project = {
        ...initialData, 
        name,
        description,
        status,
        startDate,
        endDate,
        teamMembers,

      };
      if (onUpdate) onUpdate(updatedProject);
    } else {

      const newProjectData: NewProjectData = {
        name,
        description,
        status,
        startDate,
        endDate,
        teamMembers,
      };
      if (onSubmit) onSubmit(newProjectData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Nombre del Proyecto" htmlFor="projectName">
        <Input
          id="projectName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Descripción del Proyecto" htmlFor="projectDescription">
        <textarea
          id="projectDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-150 ease-in-out"
          rows={3}
          required
        ></textarea>
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Fecha de Inicio" htmlFor="startDate">
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </FormField>

        <FormField label="Fecha de Fin" htmlFor="endDate">
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </FormField>
      </div>

      <FormField label="Estado" htmlFor="projectStatus">
        <Select
          id="projectStatus"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as NewProjectData['status'])}
        />
      </FormField>

       <FormField label="Miembros del Equipo" htmlFor="teamMembers">
        <select
          id="teamMembers"
          multiple
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-150 ease-in-out h-24" 
          value={teamMembers} 
          onChange={handleMembersChange}
          required
        >
          {teamMemberOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Mantén Ctrl/Cmd para seleccionar varios.</p>
      </FormField>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Guardar Cambios' : 'Añadir Proyecto'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;