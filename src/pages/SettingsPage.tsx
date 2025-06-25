import { useState, useEffect } from 'react';
import UserForm from '../components/specific/UserForm';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../hooks/useUsers';
import { User } from '../utils/data';

const DASHBOARD_PREFS_KEY = 'dashboard_preferences';

function SettingsPage() {
  const { user, setCurrentUser } = useAuth();
  const { updateUser } = useUsers();

  const [dashboardPrefs, setDashboardPrefs] = useState({
    showProjects: true,
    showTasks: true,
    showMembers: true,
    showRecentActivity: true,
  });

  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem(DASHBOARD_PREFS_KEY);
      if (savedPrefs) {
        setDashboardPrefs(JSON.parse(savedPrefs));
      }
    } catch (error) {
      console.error("Error al cargar preferencias del dashboard desde localStorage:", error);
    }
  }, []);

  const handlePrefChange = (prefKey: keyof typeof dashboardPrefs, isChecked: boolean) => {

    const updatedPrefs = { ...dashboardPrefs, [prefKey]: isChecked };
    setDashboardPrefs(updatedPrefs);
    
    localStorage.setItem(DASHBOARD_PREFS_KEY, JSON.stringify(updatedPrefs));
  };


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
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Personaliza tu Dashboard</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mostrar "Proyectos Activos"</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dashboardPrefs.showProjects}
                  onChange={(e) => handlePrefChange('showProjects', e.target.checked)} 
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mostrar "Tareas Pendientes"</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dashboardPrefs.showTasks}
                  onChange={(e) => handlePrefChange('showTasks', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mostrar "Miembros del Equipo"</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dashboardPrefs.showMembers}
                  onChange={(e) => handlePrefChange('showMembers', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mostrar "Actividad Reciente"</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dashboardPrefs.showRecentActivity}
                  onChange={(e) => handlePrefChange('showRecentActivity', e.target.checked)}
                  className="sr-only peer"
                />
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