import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { useAuth } from '../contexts/AuthContext';

import nexusflowLogo from '../assets/images/nexusflow_logo.png'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, ingresa tu email y contraseña.');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img
            src={nexusflowLogo}
            alt="NexusFlow Logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Login</h2>
        {error && (
          <div className="bg-danger/10 text-danger p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Email" htmlFor="email">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patricia@gmail.com"
              required
            />
          </FormField>
          <FormField label="Contraseña" htmlFor="password">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </FormField>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
            className="mt-6"
          >
            Acceder
          </Button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          <a href="#" className="text-primary hover:underline">¿Has olvidado tu contraseña?</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;