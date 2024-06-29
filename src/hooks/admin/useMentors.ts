import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryFunction,
  type QueryKey,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { API_URL } from '../../constants';
import { type Mentor } from '../../types';

interface MentorStatus {
  mentorId: string;
  state: string;
}

const fetchMentors: QueryFunction<Mentor[], QueryKey> = async ({
  queryKey,
}) => {
  const [, category]: [string, string] = queryKey as [string, string];
  let url = `${API_URL}/admin/mentors`;
  if (category !== '' && category != null) {
    url += `?categoryId=${category}`;
  }
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data.mentors;
};

const updateMentorStatus = async (mentorStatus: MentorStatus) => {
  const { mentorId, state } = mentorStatus;
  const response = await axios.put(
    `${API_URL}/admin/mentors/${mentorId}/state`,
    { state },
    { withCredentials: true }
  );
  return response.data;
};

export const useMentors = (categoryId?: string) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<Mentor[], AxiosError>({
    initialData: [],
    queryKey: ['mentors', categoryId],
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
