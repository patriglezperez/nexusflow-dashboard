
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Task, tasks as initialTasksData } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY_TASKS = 'nexusflow_tasks';


export interface TaskContextType {
  tasks: Task[];
  addTask: (newTaskData: Omit<Task, 'id' | 'createdAt'>) => void;
  getTaskById: (id: string) => Task | undefined;
  getTasksByProjectId: (projectId: string) => Task[];
}


export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY_TASKS);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(initialTasksData));
    return initialTasksData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const getTaskById = (id: string) => tasks.find(task => task.id === id);
  const getTasksByProjectId = (projectId: string) => tasks.filter(task => task.projectId === projectId);

  const contextValue: TaskContextType = {
    tasks,
    addTask,
    getTaskById,
    getTasksByProjectId,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};