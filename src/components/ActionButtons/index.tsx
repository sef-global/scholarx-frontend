import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { ApplicationStatus } from '../../enums';

interface ActionButtonsProps {
  state?: string;
  handleApprove: () => Promise<void>;
  handleReject: () => Promise<void>;
  handleComplete?: () => Promise<void>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  state,
  handleApprove,
  handleReject,
  handleComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<() => Promise<void>>(
    async () => {
      await Promise.resolve();
    }
  );

  const openModal = (message: string, action: () => Promise<void>) => {
    setModalMessage(message);
    setOnConfirmAction(() => action);
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
      {state === ApplicationStatus.PENDING && (
        <>
          <button
            className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
            onClick={() => {
              openModal('Are you sure you want to approve?', handleApprove);
            }}
          >
            Approve
          </button>
          <button
            className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
            onClick={() => {
              openModal('Are you sure you want to reject?', handleReject);
            }}
          >
            Reject
          </button>
        </>
      )}
      {state === ApplicationStatus.APPROVED && handleComplete && (
        <button
          className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-green-500 border-green-500 focus:outline-none focus:ring"
          onClick={() => {
            openModal('Are you sure you want to complete?', handleComplete);
          }}
        >
          Complete Mentorship
        </button>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        message={modalMessage}
      />
    </>
  );
};

export default ActionButtons;
