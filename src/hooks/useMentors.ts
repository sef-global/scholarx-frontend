import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { API_URL } from '../constants';
import { type Mentor } from '../types';

interface MentorStatus {
  mentorId: string;
  newStatus: string;
}

const fetchMentors = async () => {
  const response = await axios.get(`${API_URL}/admin/mentors`, {
    withCredentials: true,
  });
  return response.data.mentors;
};

const updateMentorStatus = async (mentorStatus: MentorStatus) => {
  const { mentorId, newStatus } = mentorStatus;
  const response = await axios.put(
    `${API_URL}/admin/mentors/${mentorId}/status`,
    { status: newStatus },
    { withCredentials: true }
  );
  return response.data;
};

export const useMentors = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<Mentor[], AxiosError>({
    queryKey: ['mentors'],
    queryFn: fetchMentors,
  });

  const { mutateAsync: updateStatus } = useMutation<
    unknown,
    AxiosError,
    MentorStatus
  >({
    mutationFn: updateMentorStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['mentors'] });
    },
  });

  return {
    isLoading,
    error,
    data,
    updateStatus,
  };
};
