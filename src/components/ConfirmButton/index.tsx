import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface ConfirmButtonProps {
  buttonText: string;
  buttonStyle: string;
  onConfirm: () => Promise<void>;
  confirmMessage: string;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  buttonText,
  buttonStyle,
  onConfirm,
  confirmMessage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    await onConfirm();
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={buttonStyle} onClick={handleOpenModal}>
        {buttonText}
      </button>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          message={confirmMessage}
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ConfirmButton;
