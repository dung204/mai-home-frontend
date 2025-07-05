import axios from 'axios';

import { HttpClient } from '@/base/lib';
import { CommonSearchParams, SuccessResponse } from '@/base/types';

import { UpdateUserSchema, User } from '../types';

class UserService extends HttpClient {
  constructor() {
    super();
  }

  public getUserProfile() {
    return this.get<SuccessResponse<User>>('/users/profile', {
      isPrivateRoute: true,
    });
  }

  public async updateUserProfile(payload: UpdateUserSchema) {
    const res = await this.patch<SuccessResponse<User>>(`/users/profile`, payload, {
      isPrivateRoute: true,
    });

    await axios.post('/api/auth/set-user', res.data);

    return res;
  }

  public getAllUsers(params?: CommonSearchParams) {
    return this.get<SuccessResponse<User[]>>('/users', {
      params,
    });
  }
}

export const userService = new UserService();
