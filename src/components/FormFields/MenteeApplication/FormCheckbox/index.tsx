import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { type MenteeApplication } from '../../../../types';

export interface FormCheckboxProps {
  name: keyof MenteeApplication;
  label: string;
  register: UseFormRegister<MenteeApplication>;
  error: FieldError | undefined;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  register,
  error,
  label,
}) => {
  return (
    <div className="mb-4 flex justify-between">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input type="checkbox" {...register(name)} />
      {error != null && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormCheckbox;
