import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { MentorApplication } from '../../../MentorRegistrationPage';

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
    <div className="mb-4 flex justify-between">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input type="checkbox" {...register(name)} />
      {error != null && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormCheckbox;
