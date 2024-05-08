import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { MentorApplication } from '../../../MentorRegistrationPage';

export interface FormTextareaProps {
  placeholder: string;
  name: keyof MentorApplication;
  label: string;
  register: UseFormRegister<MentorApplication>;
  error: FieldError | undefined;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  placeholder,
  name,
  register,
  error,
  label,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className="mt-1 p-2 w-full border rounded-md"
      />
      {error != null && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormTextarea;
