import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface CompleteButtonProps {
  isLoading: boolean;
  complete: () => void;
}

const CompleteButton: React.FC<CompleteButtonProps> = ({
  isLoading,
  complete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleComplate = () => {
    setModalMessage('Are you sure you want to complete?');
    setOnConfirmAction(() => complete);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    complete();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-green-500 border-green-500 focus:outline-none focus:ring"
        onClick={handleComplate}
      >
        {isLoading ? 'Loading...' : 'Complete Mentorship'}
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        message={modalMessage}
      />
    </>
  );
};

export default CompleteButton;
