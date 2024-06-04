import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface ApproveRejectButtonsProps {
  isLoading: boolean;
  approve: () => void;
  reject: () => void;
}

const ApproveRejectButtons: React.FC<ApproveRejectButtonsProps> = ({
  isLoading,
  approve,
  reject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => {});

  const handleApprove = () => {
    setModalMessage('Are you sure you want to approve?');
    setOnConfirmAction(() => approve);
    setIsModalOpen(true);
  };

  const handleReject = () => {
    setModalMessage('Are you sure you want to reject?');
    setOnConfirmAction(() => reject);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    onConfirmAction();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
        onClick={handleApprove}
      >
        {isLoading ? 'Loading...' : 'Approve'}
      </button>
      <button
        className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
        onClick={handleReject}
      >
        {isLoading ? 'Loading...' : 'Reject'}
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

export default ApproveRejectButtons;
