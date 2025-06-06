// src/components/specific/ProjectForm.tsx
import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select'; // Asegúrate de que este Select puede funcionar como múltiple o ajústalo
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { NewProjectData, users as allUsersData } from '../../utils/data'; // Importa NewProjectData y users

interface ProjectFormProps {
  onSubmit: (newProjectData: NewProjectData) => void; // <--- Usa NewProjectData aquí
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<NewProjectData['status']>('active'); // Tipo basado en NewProjectData
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'completed', label: 'Completado' },
    { value: 'on-hold', label: 'En Espera' },
    { value: 'pending', label: 'Pendiente' },
  ];

  // Obtener opciones de miembros del equipo de la variable global users
  const teamMemberOptions = allUsersData.map(user => ({ value: user.id, label: user.name }));

  const handleMembersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Esto es correcto para un <select multiple> nativo
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setTeamMembers(selectedOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !startDate || !endDate || teamMembers.length === 0) {
      alert('Por favor, completa todos los campos obligatorios: Nombre, Descripción, Fecha de Inicio, Fecha de Fin, y Miembros del Equipo.');
      return;
    }

    // Crea el objeto NewProjectData para enviar
    const newProjectData: NewProjectData = {
      name,
      description,
      status,
      startDate,
      endDate,
      teamMembers, // <--- Este array ya está poblado por handleMembersChange
    };

    onSubmit(newProjectData); // Envía los datos completos

    // Limpiar formulario después de enviar
    setName('');
    setDescription('');
    setStatus('active');
    setStartDate('');
    setEndDate('');
    setTeamMembers([]);
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
        {/* Usamos el componente Select si está diseñado para envolver un <select> */}
        {/* Si tu componente Select no soporta 'value' como 'Project['status']' directamente, cámbialo a un <select> nativo como el de teamMembers */}
        <Select
          id="projectStatus"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as NewProjectData['status'])}
        />
      </FormField>

       <FormField label="Miembros del Equipo" htmlFor="teamMembers">
        {/* Aquí se usa un <select> nativo con `multiple` */}
        <select
          id="teamMembers"
          multiple
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-150 ease-in-out h-24" // h-24 para que muestre varias opciones
          value={teamMembers} // El valor debe ser un array para multiple select
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
          Añadir Proyecto
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;