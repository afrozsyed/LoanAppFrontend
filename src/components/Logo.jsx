import React from 'react';

function Logo({ width = '100%' }) {
  return (
    <div className="flex items-center space-x-2" style={{ width }}>
      {/* Icon representing finance */}
      <div className="bg-cyan-500 p-3 rounded-full flex items-center justify-center shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.1046 0-2 .8954-2 2s.8954 2 2 2c1.1046 0 2 .8954 2 2s-.8954 2-2 2c-1.1046 0-2 .8954-2 2M12 8V4m0 8v4m-4-4h8"
          />
        </svg>
      </div>
      
      {/* Raghava Finances Text */}
      <h1 className="text-2xl font-bold text-cyan-500 flex items-center space-x-1">
        <span className="text-4xl text-gray-900">R</span>
        <span>aghava</span>
        <span className="text-xl font-medium text-gray-700">Finances</span>
      </h1>
    </div>
  );
}

export default Logo;
