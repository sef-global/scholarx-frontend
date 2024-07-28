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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    complete();
    setIsModalOpen(false);
  };

  const handleComplete = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-green-500 border-green-500 focus:outline-none focus:ring"
        onClick={handleComplete}
      >
        {isLoading ? 'Loading...' : 'Complete Mentorship'}
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        message="Are you sure you want to complete?"
      />
    </>
  );
};

export default CompleteButton;
