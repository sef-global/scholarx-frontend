import React from 'react';

interface ChangePasswordFormProps {
  onSubmit: (props: {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  }) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
}) => {
  return (
    <form
      name="change_password"
      className="max-w-md mx-auto my-8"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formObject: any = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        onSubmit(formObject);
      }}
    >
      <div className="mb-6">
        <label
          htmlFor="current_password"
          className="block text-gray-700 font-bold mb-2"
        >
          Current Password
        </label>
        <input
          type="password"
          id="current_password"
          name="current_password"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="new_password"
          className="block text-gray-700 font-bold mb-2"
        >
          New Password
        </label>
        <input
          type="password"
          id="new_password"
          name="new_password"
          required
          minLength={8}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirm_new_password"
          className="block text-gray-700 font-bold mb-2"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirm_new_password"
          name="confirm_new_password"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
