import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold transition-all duration-200 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "border-indigo-500 bg-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-600 focus:ring-indigo-500 disabled:bg-indigo-900 disabled:border-indigo-800",
    secondary: "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:border-slate-500 focus:ring-slate-500 disabled:bg-slate-900",
    danger: "border-red-500 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'cursor-wait opacity-80' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="relative flex items-center gap-2">
        {isLoading && (
          <svg className="w-5 h-5 animate-spin -ml-1 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};