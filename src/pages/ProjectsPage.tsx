
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../utils/data'; 
import Table from '../components/ui/Table';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ProjectForm from '../components/specific/ProjectForm';
import { useProjects } from '../hooks/useProjects'; 
import { useUsers } from '../hooks/useUsers'; 
import { FaPlus } from 'react-icons/fa';

function ProjectsPage() {
  const navigate = useNavigate();
  const { projects, addProject } = useProjects();
  const { getUserById } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);


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

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">
      <div className="mb-6 flex justify-end">
        <Button iconLeft={<FaPlus />} onClick={() => setIsModalOpen(true)}>
          Nuevo Proyecto
        </Button>
      </div>

      <Table
        data={projects} 
        columns={columns}
        emptyMessage="No hay proyectos registrados."
        onRowClick={handleRowClick}
      />

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