import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Profile } from '../types';

const useProfile = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['profile'],
    initialData: null,
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

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async ({
      profile,
      image,
    }: {
      profile: Profile;
      image: File | null;
    }) => {
      const formData = new FormData();

      if (image != null) {
        formData.append('profile_image', image);
      }
      Object.entries(profile).forEach(([key, value]) => {
        formData.append(key, value);
      });

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
    isLoading,
    error,
    data,
    refetch: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    updateProfile,
  };
};

export default useProfile;
