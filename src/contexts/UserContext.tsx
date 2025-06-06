// src/contexts/UserContext.tsx

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  User,
  users as initialUsers, // Importa la variable 'users' desde data.ts
  addUser as addUserToData,
  updateUser as updateUserToData,
  deleteUser as deleteUserFromData,
  getUserById as getUserByIdFromData // Importa el getter directo
} from '../utils/data';

// Define el tipo del contexto de usuarios
export interface UserContextType {
  users: User[];
  addUser: (userData: Omit<User, 'id'>) => User;
  updateUser: (updatedUser: User) => boolean;
  deleteUser: (id: string) => boolean;
  getUserById: (id: string) => User | undefined; // Expone el getter
  refreshUsers: () => void; // Para recargar usuarios si es necesario
}

// Crea el contexto de usuarios
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Crea el proveedor del contexto de usuarios
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usersState, setUsersState] = useState<User[]>(initialUsers);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Al montar o cuando refreshKey cambia, recargamos de la variable global de data.ts
    setUsersState([...initialUsers]);
  }, [refreshKey]);

  const handleAddUser = useCallback((userData: Omit<User, 'id'>) => {
    const newUser = addUserToData(userData);
    setUsersState(prev => [...prev, newUser]);
    return newUser;
  }, []);

  const handleUpdateUser = useCallback((updatedUser: User) => {
    const updated = updateUserToData(updatedUser);
    if (updated) {
      setUsersState(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    }
    return updated;
  }, []);

  const handleDeleteUser = useCallback((id: string) => {
    const deleted = deleteUserFromData(id);
    if (deleted) {
      setUsersState(prev => prev.filter(u => u.id !== id));
    }
    return deleted;
  }, []);

  // Función para obtener usuario por ID desde el contexto (reexpone la de data.ts)
  const getUserById = useCallback((id: string) => {
    // Aunque data.ts tiene una función, podemos usar el estado local también.
    // Usar el estado local asegura que sea reactivo a cambios hechos dentro del contexto.
    return usersState.find(u => u.id === id);
    // O si prefieres usar la función directamente de data.ts (menos reactivo a cambios locales no persistidos):
    // return getUserByIdFromData(id);
  }, [usersState]); // Depende de usersState para reactividad

  const refreshUsers = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const contextValue: UserContextType = {
    users: usersState,
    addUser: handleAddUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    getUserById: getUserById,
    refreshUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};