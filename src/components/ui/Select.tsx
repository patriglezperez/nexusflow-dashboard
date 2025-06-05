import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition duration-150 ease-in-out
                  ${className || ''}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;