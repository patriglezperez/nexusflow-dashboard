import React from 'react';

interface FormFieldProps {
  label?: string;
  htmlFor?: string; 
  errorMessage?: string;
  children: React.ReactNode; 
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, errorMessage, children, className }) => {
  return (
    <div className={`mb-4 ${className || ''}`}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {children}
      {errorMessage && (
        <p className="mt-1 text-sm text-danger">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormField;