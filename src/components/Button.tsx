'use client';

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps): React.ReactElement => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        transition-all duration-200 ease-in-out 
        px-6 py-2 rounded-full font-semibold text-white 
        bg-gradient-to-r from-blue-500 to-purple-500 
        hover:from-purple-500 hover:to-blue-500 
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
