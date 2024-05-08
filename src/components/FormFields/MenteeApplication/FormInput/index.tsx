import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { type MenteeApplication } from '../../../../types';

export interface FormInputProps {
  type: string;
  placeholder: string;
  name: keyof MenteeApplication;
  label: string;
  register: UseFormRegister<MenteeApplication>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  label,
  valueAsNumber,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className="mt-1 p-2 w-full border rounded-md"
      />
      {error != null && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormInput;
