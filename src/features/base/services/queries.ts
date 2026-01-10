import { useQuery } from '@tanstack/react-query';
import baseApiService from './api';

export const useGetMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: baseApiService.getMe,
    refetchOnWindowFocus: false,
  });
};
