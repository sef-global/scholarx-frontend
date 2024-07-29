import React from 'react';
import { ApplicationStatus } from '../../enums';
import ConfirmButton from '../ConfirmButton';

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
  return (
    <>
      {state === ApplicationStatus.PENDING && (
        <>
          <ConfirmButton
            buttonText="Approve"
            buttonStyle="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-green-500 border-green-500 focus:outline-none focus:ring"
            onConfirm={handleApprove}
            confirmMessage="Are you sure you want to approve?"
          />
          <ConfirmButton
            buttonText="Reject"
            buttonStyle="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
            onConfirm={handleReject}
            confirmMessage="Are you sure you want to reject?"
          />
        </>
      )}
      {state === ApplicationStatus.APPROVED && handleComplete && (
        <ConfirmButton
          buttonText="Complete"
          buttonStyle="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-blue-500 border-blue-500 focus:outline-none focus:ring"
          onConfirm={handleComplete}
          confirmMessage="Are you sure you want to complete?"
        />
      )}
    </>
  );
};

export default ActionButtons;
