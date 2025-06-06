

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  User,
  users as initialUsers, 
  addUser as addUserToData,
  updateUser as updateUserToData,
  deleteUser as deleteUserFromData,
  getUserById as getUserByIdFromData 
} from '../utils/data';


export interface UserContextType {
  users: User[];
  addUser: (userData: Omit<User, 'id'>) => User;
  updateUser: (updatedUser: User) => boolean;
  deleteUser: (id: string) => boolean;
  getUserById: (id: string) => User | undefined; 
  refreshUsers: () => void; 
}


export const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usersState, setUsersState] = useState<User[]>(initialUsers);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
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

  
  const getUserById = useCallback((id: string) => {
   
    return usersState.find(u => u.id === id);

  }, [usersState]); 

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