import React from 'react';

export default function Navbar({ onLoginClick }) {
  return (
    <nav className="bg-base-200 p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-primary">
        Order Management
      </div>
      <button
        className="btn btn-primary btn-sm"
        onClick={onLoginClick}
      >
        Login
      </button>
    </nav>
  );
}
