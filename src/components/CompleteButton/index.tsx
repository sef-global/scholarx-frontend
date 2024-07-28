import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface CompleteButtonProps {
  complete: () => Promise<void>;
}

const CompleteButton: React.FC<CompleteButtonProps> = ({ complete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await complete();
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
        Complete Mentorship
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
