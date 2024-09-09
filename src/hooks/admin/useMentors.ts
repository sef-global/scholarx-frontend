import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
  type QueryFunctionContext,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { API_URL } from '../../constants';
import { type Mentor } from '../../types';

interface MentorStatus {
  mentorId: string;
  state: string;
}

interface MentorResponse {
  items: Mentor[];
  message: string;
  pageNumber: number;
  pageSize: number;
  totalItemCount: number;
}

type MentorsQueryKey = ['mentors', string | null, string | null, number];

const fetchMentors = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<MentorsQueryKey, number>): Promise<MentorResponse> => {
  const [, category, mentorStatus, pageSize] = queryKey;
  let url = `${API_URL}/admin/mentors?pageNumber=${pageParam}&pageSize=${pageSize}`;
  if (category !== '' && category != null) {
    url += `&categoryId=${category}`;
  }
  if (mentorStatus !== null && mentorStatus !== '') {
    url += `&status=${mentorStatus}`;
  }
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
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

export const useMentors = (
  categoryId: string | null,
  mentorStatus: string | null,
  pageSize = 10
) => {
  const queryClient = useQueryClient();

  const infiniteQueryOptions: UseInfiniteQueryOptions<
    MentorResponse,
    AxiosError,
    InfiniteData<MentorResponse, number>,
    MentorResponse,
    MentorsQueryKey,
    number
  > = {
    queryKey: ['mentors', categoryId, mentorStatus, pageSize],
    queryFn: fetchMentors,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage <= Math.ceil(lastPage.totalItemCount / lastPage.pageSize)
        ? nextPage
        : undefined;
    },
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(infiniteQueryOptions);

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

  const mentors = data?.pages.flatMap((page) => page.items) ?? [];
  const totalItemCount = data?.pages[0]?.totalItemCount ?? 0;

  return {
    data: mentors,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    updateStatus,
    totalItemCount,
  };
};
