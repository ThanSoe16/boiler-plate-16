import appAxios from '@/lib/axios';
import { LoginForm, LoginResponse } from '../types';
import { APIResponse } from '@/features/base/types/base';

const authApiService = {
  login: async (data: LoginForm) => {
    const response = await appAxios.post<APIResponse<LoginResponse>>('/auth/admin/login', data);
    return response.data;
  },
};

export default authApiService;
