import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { FaBars } from 'react-icons/fa';
import Button from '../ui/Button'; 
import { useAuth } from '../../contexts/AuthContext'; 

interface NavbarProps {
  onMenuToggle: () => void;
}

function Navbar({ onMenuToggle }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { user, logout } = useAuth(); 

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

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <header className="bg-white p-4 flex justify-between items-center z-10 rounded-tr-3xl">
      <button onClick={onMenuToggle} className="text-gray-600 md:hidden text-2xl">
        <FaBars />
      </button>

      <h1 className="text-3xl font-bold text-gray-800 ml-4 md:ml-0">{pageTitle}</h1>

      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-gray-700 text-lg font-medium hidden sm:inline">Hola, {user.name}!</span>
        )}
        <img
          src={user?.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=AD&backgroundColor=4F46E5&fontColor=FFFFFF"} // Usar avatar del usuario logueado
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-primary shadow-md"
        />
        <Button variant="ghost" onClick={handleLogout} className="hidden sm:inline-flex">
          Cerrar Sesión
        </Button>
      </div>
    </header>
  );
}

export default Navbar;