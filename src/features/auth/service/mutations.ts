import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginForm } from '../types';
import authApiService from './api';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginForm) => authApiService.login(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
  });
};
