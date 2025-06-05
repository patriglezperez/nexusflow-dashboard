
import React, { ButtonHTMLAttributes } from 'react';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean; 
  iconLeft?: React.ReactNode; 
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className, 
  disabled, 
  ...props 
}) => {
 
  const baseClasses = `
    flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantClasses = {
    primary: `bg-primary text-white-ish hover:bg-primary-dark focus:ring-primary shadow-md`,
    secondary: `bg-secondary-light text-gray-800 hover:bg-gray-300 focus:ring-secondary-light shadow-sm`,
    outline: `border border-primary text-primary hover:bg-primary/10 focus:ring-primary`,
    ghost: `text-primary hover:bg-primary/10 focus:ring-primary`,
    danger: `bg-danger text-white-ish hover:bg-red-700 focus:ring-danger shadow-md`,
  };

  const sizeClasses = {
    sm: `px-3 py-1.5 text-sm`,
    md: `px-4 py-2 text-base`,
    lg: `px-6 py-3 text-lg`,
  };


  const spinnerClasses = `
    ml-2 w-4 h-4 border-2 border-white-ish border-t-transparent rounded-full animate-spin
    ${variant === 'secondary' ? 'border-primary border-t-transparent' : ''}
  `;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className || ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{children}</span>
          <div className="absolute flex items-center">
             {iconLeft && <span className="mr-2">{iconLeft}</span>}
             <div className={spinnerClasses}></div>
             {iconRight && <span className="ml-2">{iconRight}</span>}
          </div>
        </>
      ) : (
        <>
          {iconLeft && <span className="mr-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default Button;