import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface ApproveRejectButtonsProps {
  approve: () => Promise<void>;
  reject: () => Promise<void>;
}

const ApproveRejectButtons: React.FC<ApproveRejectButtonsProps> = ({
  approve,
  reject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<() => Promise<void>>(
    async () => {
      await Promise.resolve();
    }
  );

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

  const handleConfirm = async () => {
    await onConfirmAction();
    setIsModalOpen(false);
  };

  return (
    <>
      <>
        <button
          className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
          onClick={handleApprove}
        >
          Approve
        </button>
        <button
          className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
          onClick={handleReject}
        >
          Reject
        </button>
      </>
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
