
import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import { User } from '../../utils/data';

interface UserFormProps {
  onSubmit: (user: Omit<User, 'id' | 'avatarUrl' | 'status'>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<User['role']>('developer'); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Por favor, completa todos los campos obligatorios: Nombre y Correo Electrónico.');
      return;
    }
    onSubmit({ name, email, role });

    setName('');
    setEmail('');
    setRole('developer');
  };

  const roleOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'developer', label: 'Desarrollador' },
    { value: 'designer', label: 'Diseñador' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Nombre Completo" htmlFor="name">
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Correo Electrónico" htmlFor="email">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Rol" htmlFor="role">
        <Select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as User['role'])}
          options={roleOptions}
        />
      </FormField>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Añadir Usuario
        </Button>
      </div>
    </form>
  );
};

export default UserForm;