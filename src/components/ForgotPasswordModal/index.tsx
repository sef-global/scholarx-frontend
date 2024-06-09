import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../../hooks/useForgotPassword';
import { type PasswordResetData } from '../../types';
import { z } from 'zod';
import Loading from '../../assets/svg/Loading';
import closeIcon from '../../assets/svg/closeIcon.svg';

const ForgotPasswordDataSchema = z.object({
  email: z.string(),
});

interface ForgotPasswordModalProps {
  handleClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  handleClose,
}) => {
  const { register, handleSubmit } = useForm<PasswordResetData>();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('default');
  const { requestPasswordReset } = useResetPassword();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: PasswordResetData) => {
    setLoading(true);

    const validatedData = ForgotPasswordDataSchema.parse(data);
    requestPasswordReset(validatedData, {
      onSuccess: () => {
        setMessage(
          `A password reset link has been sent to your email address. Please check your email and follow the instructions to reset your password. `
        );
        setMessageType('success');
        setLoading(false);
      },
      onError: () => {
        setMessage('Error sending email, Check your email and try again.');
        setMessageType('error');
        setLoading(false);
      },
    });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 flex-col items-center justify-center h-screen w-full p-5 ">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <button
            className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={handleClose}
          >
            <img className="w-6 h-6" src={closeIcon} alt="Modal Close Icon" />
          </button>

          <div className="bg-white p-6 space-y-8 rounded-lg shadow-xl">
            <div className="m-5">
              <h2 className="text-2xl mb-5 font-semibold text-gray-900 text-center">
                Reset Password
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email address"
                  className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                {message.length > 0 && (
                  <div
                    className={`px-4 py-3 my-3 text-center ${
                      messageType === 'success'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {message}
                  </div>
                )}
                <div>
                  {loading ? (
                    <div className="flex justify-center items-center px-4 py-2">
                      <Loading />
                    </div>
                  ) : (
                    messageType !== 'success' && (
                      <div className="flex justify-center items-center">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 text-base font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer shadow-md transition-all md:w-auto"
                        >
                          Submit
                        </button>
                      </div>
                    )
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordModal;
