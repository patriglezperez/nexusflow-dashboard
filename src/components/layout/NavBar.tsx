
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';


interface NavbarProps {
  onMenuToggle: () => void;
}


function Navbar({ onMenuToggle }: NavbarProps) {
  const location = useLocation();
  let pageTitle = "Dashboard";

  switch (location.pathname) {
    case '/': pageTitle = 'Dashboard'; break;
    case '/projects': pageTitle = 'Proyectos'; break;
    case '/tasks': pageTitle = 'Tareas'; break;
    case '/users': pageTitle = 'Usuarios'; break;
    case '/settings': pageTitle = 'Configuración'; break;
    default:
      if (location.pathname.startsWith('/projects/')) {
        pageTitle = 'Detalle del Proyecto';
      } else {
        pageTitle = 'Página';
      }
      break;
  }

  return (
    <header className="bg-white p-4 flex justify-between items-center z-10 rounded-tr-3xl">
      <button onClick={onMenuToggle} className="text-gray-600 md:hidden text-2xl">
        <FaBars />
      </button>

      <h1 className="text-3xl font-bold text-gray-800 ml-4 md:ml-0">{pageTitle}</h1>

      <div className="flex items-center space-x-4">
        <span className="text-gray-700 text-lg font-medium hidden sm:inline">Hola, Administrador!</span>
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=AD&backgroundColor=4F46E5&fontColor=FFFFFF"
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-primary shadow-md"
        />
      </div>
    </header>
  );
}

export default Navbar;