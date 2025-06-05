
import React from 'react';

interface ProgressBarProps {
  value: number; 
  maxValue?: number;
  className?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

function ProgressBar({ value, maxValue = 100, className, color = 'primary' }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));

  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-info',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300 ease-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;