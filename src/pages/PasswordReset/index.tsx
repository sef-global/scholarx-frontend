import React, { useEffect, useState } from 'react';
import { useResetPassword } from '../../hooks/useForgotPassword';
import { z } from 'zod';
import Loading from '../../assets/svg/Loading';
import closeIcon from '../../assets/svg/closeIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const SetNewPasswordDataSchema = z.object({
  newPassword: z.string(),
  token: z.string(),
});

const NewPasswordModal: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { updatePassword } = useResetPassword();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    newPassword: '',
    token: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token') ?? '';

  useEffect(() => {
    setFormData({ ...formData, token });
  }, [token]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const validatedData = SetNewPasswordDataSchema.parse(formData);
    updatePassword(validatedData, {
      onSuccess: () => {
        setMessage('Your password has been reset successfully.');
        setLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      },
      onError: () => {
        setMessage('Error resetting password. Please try again.');
        setLoading(false);
      },
    });
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setFormData({ ...formData, newPassword: e.target.value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== newPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage('');
    }
    setFormData({ ...formData, newPassword: e.target.value });
  };

  const handleClose = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setIsOpen(false);
  };

  return (
    isOpen && (
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
                  Create a New Password
                </h2>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={handleNewPasswordChange}
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$"
                    title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={handleConfirmPasswordChange}
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$"
                    title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                    required
                  />
                  <p className="text-gray-600 mb-5">
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </p>
                  <div>
                    {loading ? (
                      <div className="flex justify-center items-center px-4 py-2">
                        <>
                          <Loading />
                        </>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full px-4 py-2 text-base font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer"
                      >
                        Update
                      </button>
                    )}
                    {message.length > 0 && (
                      <div className=" text-black px-4 py-3 my-3">
                        <div
                          className={`${
                            message === 'Passwords do not match'
                              ? 'text-red-500 text-center'
                              : 'text-green-500 text-center'
                          }`}
                        >
                          {message}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NewPasswordModal;
