import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { Project } from '../utils/data'; 
import Table from '../components/ui/Table';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ProjectForm from '../components/specific/ProjectForm';
import { useProjects } from '../hooks/useProjects'; 
import { useUsers } from '../hooks/useUsers'; 
import { FaPlus, FaTable, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineTimeline } from "react-icons/md";


function ProjectsPage() {
  const navigate = useNavigate();
  const { projects, addProject } = useProjects();
  const { getUserById } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');


  const handleAddProject = (newProjectData: Parameters<typeof addProject>[0]) => {
    addProject(newProjectData); 
    setIsModalOpen(false);
  };

  const renderStatus = (status: Project['status']): React.ReactNode => {
    let variant: 'info' | 'success' | 'warning' | 'danger' | 'secondary' = 'secondary';
    switch (status) {
      case 'active': variant = 'info'; break;
      case 'completed': variant = 'success'; break;
      case 'on-hold': variant = 'warning'; break;
      case 'pending': variant = 'secondary'; break;
    }
    return <Badge variant={variant} text={status.replace('-', ' ').toUpperCase()} />;
  };

  const getTeamMembersNames = (memberIds: string[]): string => {
    
    return memberIds
      .filter(id => id) 
      .map(id => getUserById(id)?.name || 'Desconocido')
      .join(', ');
  };

  const columns = React.useMemo(() => [
    { header: 'Nombre del Proyecto', accessor: (row: Project) => row.name, className: 'font-medium text-primary max-w-[180px] truncate' },
    { header: 'Descripción', accessor: (row: Project) => row.description, className: 'max-w-[250px] truncate' },
    { header: 'Estado', accessor: (row: Project) => renderStatus(row.status), className: 'w-auto' },
    {
      header: 'Progreso',
      accessor: (row: Project) => (
        <ProgressBar value={row.progress} />
      ),
      className: 'w-28'
    },
    { header: 'Fecha Fin', accessor: (row: Project) => row.endDate, className: 'text-gray-600 w-28 whitespace-nowrap' },
    { header: 'Miembros', accessor: (row: Project) => getTeamMembersNames(row.teamMembers), className: 'text-gray-600 max-w-[150px] truncate' },
  ], [projects, getUserById]); 

  const handleRowClick = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };
  

  const sortedProjects = React.useMemo(() => {
    return [...projects].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [projects]);


  return (
    <div className="pt-6 pb-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col lg:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">Proyectos</h2>
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 w-full lg:w-auto">
          <Button
            variant={viewMode === 'table' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('table')}
            iconLeft={<FaTable />}
            className='w-full lg:w-52'
          >
            Vista Tabla
          </Button>
          <Button
            variant={viewMode === 'timeline' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('timeline')}
            iconLeft={<MdOutlineTimeline />}
            className='w-full lg:w-52'
          >
            Vista Línea de Tiempo
          </Button>
          <Button 
            size="md"
            className="w-full lg:w-52"
            iconLeft={<FaPlus />} onClick={() => setIsModalOpen(true)}>
              Nuevo Proyecto
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Table
          data={projects} 
          columns={columns}
          emptyMessage="No hay proyectos registrados."
          onRowClick={handleRowClick}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Línea de Tiempo de Proyectos</h3>
            <div className="relative pl-8">
    
                <div className="absolute top-0 left-7 w-1 bg-gray-200 h-full"></div>
                
                <ul className="relative space-y-8">
                    {sortedProjects.map((project, index) => (
                        <li key={project.id} className="relative pl-8 pb-8 last:pb-0">
           
                            <div className="absolute left-[-1.1rem] top-0 bg-white border-4 border-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm text-primary shadow-md z-10">
                                {index + 1}
                            </div>
                            
               
                            <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:border-primary-dark">
                                <div className="flex  flex-col-reverse lg:flex-row justify-between items-center mb-2">
                                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">{project.startDate}</span>
                                    {renderStatus(project.status)}
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-1">{project.name}</h4>
                                <p className="text-sm text-gray-600 truncate">{project.description}</p>
                                <div className="mt-2 text-sm text-gray-700">
                                  <span className="font-semibold">Progreso:</span> {project.progress}% <ProgressBar value={project.progress} color={project.progress === 100 ? 'success' : 'primary'} className="mt-1" />
                                </div>
                                <div className="mt-2">
                                    <span className="font-semibold text-sm text-gray-700">Equipo:</span> {getTeamMembersNames(project.teamMembers)}
                                </div>
                                <Link to={`/projects/${project.id}`} className="mt-4 text-primary font-semibold text-sm hover:underline">
                                    Ver Detalles →
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {projects.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No hay proyectos para mostrar en la línea de tiempo.</p>
            )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Añadir Nuevo Proyecto"
      >
        <ProjectForm onSubmit={handleAddProject} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default ProjectsPage;