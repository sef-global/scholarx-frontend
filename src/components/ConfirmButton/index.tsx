import React, { useState } from 'react';
import InformationModal from '../InformationModal';

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
        <InformationModal
          isOpen={isModalOpen}
          headline={confirmMessage}
          onConfirm={handleConfirm}
          body="An email will be sent to the applicant."
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ConfirmButton;
