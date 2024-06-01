import React, { useState, useEffect } from 'react';
import SuccessIcon from '../../assets/svg/Icons/SuccessIcon';
import ErrorIcon from '../../assets/svg/Icons/ErrorIcon';

const Toast = ({
  message,
  type,
}: {
  message: string;
  type: 'success' | 'error';
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed top-16 right-4 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
    >
      <div className="flex p-4">
        <div className="flex-shrink-0">
          {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
        </div>
        <div className="ms-3">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
