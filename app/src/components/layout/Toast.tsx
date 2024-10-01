import React, { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, message, type, duration = 3000, onClose }): JSX.Element => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prevProgress - 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  const icons = {
    success: <CheckCircle className="w-6 h-6" />,
    error: <XCircle className="w-6 h-6" />,
    warning: <AlertCircle className="w-6 h-6" />,
    info: <AlertCircle className="w-6 h-6" />
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-start space-x-3 ${typeStyles[type]} text-white transform transition-all duration-300 ease-out`}
      style={{ 
        zIndex: 1000, 
        width: '350px',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-lg">{title}</h4>
            <p className="text-sm mt-1">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="relative w-full h-1 bg-white bg-opacity-30 rounded-full mt-3">
          <div
            className="absolute h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;