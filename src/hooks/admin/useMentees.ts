import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../../constants';
import axios, { type AxiosError } from 'axios';
import { type Mentee } from '../../types';
import { type ApplicationStatus } from '../../enums';

interface MenteeStatus {
  menteeId: string;
  status: ApplicationStatus;
}

const updateMenteeStatus = async ({ menteeId, status }: MenteeStatus) => {
  const response = await axios.put(
    `${API_URL}/admin/mentees/${menteeId}/status`,
    { status },
    { withCredentials: true }
  );
  return response.data;
};

const useMentees = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['admin-mentees'],
    initialData: null,
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/admin/mentees/applications`,
        {
          withCredentials: true,
        }
      );
      return data.mentees as Mentee[];
    },
  });

  const { mutateAsync: updateStatus } = useMutation<
    unknown,
    AxiosError,
    MenteeStatus
  >({
    mutationFn: updateMenteeStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-mentees'] });
    },
  });

  return {
    isLoading,
    error,
    data,
    updateStatus,
  };
};

export default useMentees;
