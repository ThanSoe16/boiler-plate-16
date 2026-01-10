import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginForm } from '../types';
import authApiService from './api';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginForm) => authApiService.login(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data?.body?.data ?? {};
      Cookies.set('accessToken', accessToken ?? '', {
        expires: 1, // 1 day
        secure: true,
        sameSite: 'strict',
      });

      Cookies.set('refreshToken', refreshToken ?? '', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};
