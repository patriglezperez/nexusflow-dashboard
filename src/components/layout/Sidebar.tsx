
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import { useAuth } from '../../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import nexusflowLogo from '../../assets/images/nexusflow_logo.png'; 
import { MdDashboardCustomize } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoExit } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 

  const navItems = [
    { name: 'Dashboard', icon:<MdDashboardCustomize />, path: '/' },
    { name: 'Proyectos', icon: <FaProjectDiagram /> , path: '/projects' },
    { name: 'Tareas', icon: <FaTasks /> , path: '/tasks' },
    { name: 'Usuarios', icon: <FaUserFriends /> , path: '/users' },
    { name: 'Configuración', icon: <IoIosSettings /> , path: '/settings' },
  ];

  const backdropClasses = `
    fixed inset-0 bg-black bg-opacity-50 z-40
    ${isOpen && className?.includes('md:hidden') ? 'block' : 'hidden'}
  `;

  const handleLogout = () => {
    logout();
    onClose(); 
    navigate('/login'); 
  };

  return (
    <>
      {className?.includes('md:hidden') && isOpen && (
        <div className={backdropClasses} onClick={onClose}></div>
      )}

      <aside
        className={`w-64 bg-dark text-white-ish p-6 flex-col rounded-l-3xl  ${className || ''}
                   ${className?.includes('md:hidden')
                     ? `absolute top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out  ${isOpen ? 'translate-x-0 ' : '-translate-x-full '}`
                     : ''}`}
      >
        {className?.includes('md:hidden') && (
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
              <FaTimes />
            </button>
          </div>
        )}

        <div className="text-3xl font-extrabold mb-10 text-white tracking-wide flex">
          <img
            src={nexusflowLogo}
            alt="NexusFlow Logo"
            className="w-12 h-12 object-contain"
          />
          <p className='ml-2 mt-4 text-sm'>nexusFlow</p>
        </div>
        <nav className="flex-1">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-all duration-200 text-base font-medium
                     ${isActive
                       ? 'bg-primary text-white-ish shadow-md transform scale-105'
                       : 'text-gray-300 hover:bg-gray-700 hover:text-white-ish'
                     }`
                  }
                >
                  <span className="text-xl mr-4">{item.icon}</span> {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-700">
          <button
            className="w-full text-left p-3 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors duration-200 flex items-center"
            onClick={handleLogout}
          >
            <IoExit className="mr-3" /> Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;