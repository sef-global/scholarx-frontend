import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Profile } from '../types';

const useProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (profile: Partial<Profile>) => {
      const { data } = await axios.put(`${API_URL}/me/profile`, profile, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    updateProfile,
  };
};

export default useProfile;
