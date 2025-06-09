import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const baseStyles = "fixed bottom-4 right-4 flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 animate-slide-up";
  const progressBarStyles = "absolute bottom-0 left-0 h-1 transition-all duration-300";

  const typeStyles = {
    success: {
      toast: "bg-green-50 text-green-800 border-l-4 border-green-500",
      icon: "text-green-500",
      progress: "bg-green-500"
    },
    error: {
      toast: "bg-red-50 text-red-800 border-l-4 border-red-500",
      icon: "text-red-500",
      progress: "bg-red-500"
    },
    info: {
      toast: "bg-blue-50 text-blue-800 border-l-4 border-blue-500",
      icon: "text-blue-500",
      progress: "bg-blue-500"
    }
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type].toast}`}>
      <div className={`flex-shrink-0 ${typeStyles[type].icon}`}>
        {getIcon()}
      </div>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 flex-shrink-0 rounded-full p-1 transition-colors duration-200 hover:bg-black/5"
      >
        <span className="sr-only">Cerrar</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-200">
        <div
          className={`${progressBarStyles} ${typeStyles[type].progress}`}
          style={{
            width: '100%',
            animation: 'shrink 5s linear forwards'
          }}
        />
      </div>
      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default Toast; 