import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { AuthUser } from '../types';

const getUser = (): Promise<AuthUser> => {
  return axios.get('/auth/me');
};

type QueryFnType = typeof getUser;

type UseGetUserOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetUser = ({ config }: UseGetUserOption = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['getUser'],
    queryFn: () => getUser()
  });
};
