

import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { User } from '../../utils/data'; 

interface UserFormProps {
  
  onSubmit: (userData: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<User['role']>('developer'); 
  const [status, setStatus] = useState<User['status']>('active'); 
  const [avatarUrl, setAvatarUrl] = useState(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`); // Avatar aleatorio


  const roleOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'developer', label: 'Desarrollador' },
    { value: 'designer', label: 'Diseñador' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role || !status) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    
    onSubmit({
      name,
      email,
      role,
      avatarUrl, 
      status,    
    });


    setName('');
    setEmail('');
    setRole('developer'); 
    setStatus('active'); 
    setAvatarUrl(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Nombre" htmlFor="userName">
        <Input
          id="userName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Email" htmlFor="userEmail">
        <Input
          id="userEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Rol" htmlFor="userRole">
        <Select
          id="userRole"
          options={roleOptions}
          value={role}
          onChange={(e) => setRole(e.target.value as User['role'])}
        />
      </FormField>

      <FormField label="Estado" htmlFor="userStatus">
        <Select
          id="userStatus"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as User['status'])}
        />
      </FormField>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Guardar Usuario
        </Button>
      </div>
    </form>
  );
};

export default UserForm;