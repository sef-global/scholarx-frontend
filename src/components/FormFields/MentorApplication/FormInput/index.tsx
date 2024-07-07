import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { type MentorApplication } from '../../../../types';

export interface FormInputProps {
  type: string;
  placeholder: string;
  name: keyof MentorApplication;
  label: string;
  register: UseFormRegister<MentorApplication>;
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
        key={name}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className="mt-1 p-2 w-full border rounded-md"
      />
      {error != null && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormInput;
