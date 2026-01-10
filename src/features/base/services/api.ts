import appAxios from '@/lib/axios';
import { Admin } from '../types';
import { APIResponse } from '../types/base';

const baseApiService = {
  getMe: async () => {
    const response = await appAxios.get<APIResponse<Admin>>('/auth/admin/whoami');
    return response.data;
  },
};

export default baseApiService;
