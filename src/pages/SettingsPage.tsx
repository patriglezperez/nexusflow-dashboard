
import React from 'react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import UserForm from '../components/specific/UserForm';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../hooks/useUsers';
import { User } from '../utils/data';

function SettingsPage() {
  const { user, setCurrentUser } = useAuth(); 
  const { updateUser } = useUsers();

  const handleUpdateProfile = (updatedUserData: any) => {
    if (user) {
      const updatedUserWithId: User = {
        id: user.id,
        avatarUrl: user.avatarUrl,
        ...updatedUserData,
      };

      const success = updateUser(updatedUserWithId);
      if (success) {
        setCurrentUser(updatedUserWithId); 
        alert('Perfil actualizado exitosamente.');
      } else {
        alert('Error al actualizar el perfil.');
      }
    }
  };

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

  if (!user) {
    return (
      <div className="pt-6 pb-6 h-full flex flex-col items-center justify-center text-gray-700">
        <h2 className="text-2xl font-bold mb-4">Error: Usuario no encontrado</h2>
        <p>Por favor, inicia sesión para ver y editar tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Perfil de Usuario</h3>
          <UserForm
            initialData={user}
            onUpdate={handleUpdateProfile}
            onSubmit={() => { alert('Esta acción es solo para actualizar el perfil, no para añadir.'); }}
            onCancel={() => alert('No se guardaron los cambios del perfil.')}
          />
        </div>

        <div className="bg-white-ish p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Preferencias de Notificaciones</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificaciones por correo electrónico</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificaciones Push (móvil)</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;