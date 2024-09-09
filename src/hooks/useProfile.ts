import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Profile } from '../types';
import { useEffect, useState } from 'react';

const useProfile = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: isUserLoading,
    error,
    data,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${API_URL}/me/profile`, {
          withCredentials: true,
        });

        return data as Profile;
      } catch (error) {
        return null;
      }
    },
  });

  const { mutateAsync: updateProfile, isPending } = useMutation({
    mutationFn: async ({
      profile,
      image,
    }: {
      profile: Profile | null;
      image: File | null;
    }) => {
      const formData = new FormData();

      if (image != null) {
        formData.append('profile_image', image);
      }
      if (profile != null) {
        Object.entries(profile).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      const { data } = await axios.put(`${API_URL}/me/profile`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    isPending,
    isUserLoading,
    error,
    data,
    refetch: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    updateProfile,
  };
};

export default useProfile;
