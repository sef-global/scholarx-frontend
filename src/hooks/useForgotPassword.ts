import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  type PasswordUpdateData,
  type PasswordResetData,
  type PasswordResetResponse,
} from '../types';
import { API_URL } from '../constants';

export const useResetPassword = () => {
  const requestMutation = useMutation<
    PasswordResetResponse,
    unknown,
    PasswordResetData
  >({
    mutationFn: async (passwordResetData: PasswordResetData) => {
      const response = await axios.post(
        `${API_URL}/auth/password-reset-request`,
        passwordResetData
      );
      return response.data;
    },
  });

  const updateMutation = useMutation<
    PasswordResetResponse,
    unknown,
    PasswordUpdateData
  >({
    mutationFn: async ({ token, newPassword }: PasswordUpdateData) => {
      const response = await axios.put(`${API_URL}/auth/passwordreset`, {
        token,
        newPassword,
      });
      return response.data;
    },
  });

  const requestPasswordReset = (
    formData: PasswordResetData,
    { onSuccess, onError }: { onSuccess: () => void; onError: () => void }
  ) => {
    requestMutation.mutate(formData, {
      onSuccess: () => {
        onSuccess();
      },
      onError: () => {
        onError();
      },
    });
  };

  const updatePassword = (
    data: PasswordUpdateData,
    { onSuccess, onError }: { onSuccess: () => void; onError: () => void }
  ) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        onSuccess();
      },
      onError: () => {
        onError();
      },
    });
  };

  return {
    requestPasswordReset,
    updatePassword,
    error: requestMutation.error || updateMutation.error,
    data: requestMutation.data ?? updateMutation.data,
  };
};
