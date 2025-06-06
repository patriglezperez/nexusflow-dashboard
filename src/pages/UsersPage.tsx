import React, { useState } from 'react';
import { User } from '../utils/data';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import UserForm from '../components/specific/UserForm';
import { useUsers } from '../hooks/useUsers';
import { FaPlus } from 'react-icons/fa';

function UsersPage() {
  const { users, addUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleAddUser = (newUserData: Omit<User, 'id'>) => {
    addUser(newUserData);
    setIsModalOpen(false);
  };

  const renderRole = (role: User['role']): React.ReactNode => {
    let variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' = 'secondary';
    switch (role) {
      case 'admin': variant = 'primary'; break;
      case 'manager': variant = 'info'; break;
      case 'developer': variant = 'success'; break;
      case 'designer': variant = 'warning'; break;
    }
    return <Badge variant={variant} text={role.toUpperCase()} />;
  };

  const renderStatus = (status: User['status']): React.ReactNode => {
    let variant: 'success' | 'danger' | 'secondary' = 'secondary';
    switch (status) {
      case 'active': variant = 'success'; break;
      case 'inactive': variant = 'danger'; break;
    }
    return <Badge variant={variant} text={status.toUpperCase()} />;
  };

  const columns = React.useMemo(() => [
    {
      header: 'Usuario',
      accessor: (row: User): React.ReactNode => (
        <div className="flex items-center">
          <img src={row.avatarUrl} alt={row.name} className="w-10 h-10 rounded-full mr-3 border border-gray-300" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{row.name}</span>
            <span className="text-sm text-gray-500">{row.email}</span>
          </div>
        </div>
      ),
      className: 'py-2'
    },
    { header: 'Rol', accessor: (row: User) => renderRole(row.role) },
    { header: 'Estado', accessor: (row: User) => renderStatus(row.status) },
    { header: 'Email', accessor: (row: User) => row.email, className: 'text-gray-600' },
  ], [users]);

  return (
    <div className="pt-6 pb-6 h-full flex flex-col">

      <div className="mb-6 flex justify-end">
        <Button iconLeft={<FaPlus />} onClick={() => setIsModalOpen(true)}>
          Nuevo Usuario
        </Button>
      </div>
      <Table
        data={users}
        columns={columns}
        emptyMessage="No hay usuarios registrados."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Añadir Nuevo Usuario"
      >
        <UserForm onSubmit={handleAddUser} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default UsersPage;