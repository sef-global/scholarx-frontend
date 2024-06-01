import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { type MentorApplication } from '../../../../types';

export interface FormCheckboxProps {
  name: keyof MentorApplication;
  label: string;
  register: UseFormRegister<MentorApplication>;
  error: FieldError | undefined;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  register,
  error,
  label,
}) => {
  return (
    <div className="mb-4 flex-col items-start">
      <div className="flex items-center">
        <input
          type="checkbox"
          {...register(name)}
          className="mr-2 items-center h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label className="block text-sm font-medium text-gray-600">
          {label}
        </label>
      </div>
      {error != null && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormCheckbox;
