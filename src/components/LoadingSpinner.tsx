import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 top-0 z-[500] flex items-center justify-center m-auto bg-transparent/[0.05] backdrop-blur-sm w-full h-full">
      <svg
        className="w-12 h-12 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          className="fill-current animate-spinner"
          x="1"
          y="1"
          rx="1"
          width="8"
          height="8"
        />
        <rect
          className="fill-current animate-spinner"
          x="1"
          y="1"
          rx="1"
          width="8"
          height="8"
          style={{ animationDelay: '-1.2s' }}
        />
        <rect
          className="fill-current animate-spinner"
          x="1"
          y="1"
          rx="1"
          width="8"
          height="8"
          style={{ animationDelay: '-0.4s' }}
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;