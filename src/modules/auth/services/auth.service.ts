import axios from 'axios';

import { HttpClient } from '@/base/lib';
import {
  ChangePasswordSchema,
  GetOtpSchema,
  LoginSchema,
  LoginSuccessResponse,
  OAuthAction,
  VerifyOtpSchema,
} from '@/modules/auth/types';

class AuthService extends HttpClient {
  constructor() {
    super();
  }

  public getOtp(payload: GetOtpSchema) {
    return this.post<LoginSuccessResponse>('/auth/get-otp', payload);
  }

  public verifyOtp(payload: VerifyOtpSchema) {
    return this.post<LoginSuccessResponse>('/auth/verify-otp', payload);
  }

  public register(payload: LoginSchema) {
    return this.post<LoginSuccessResponse>('/auth/register', payload);
  }

  public async handleGoogleAuth(payload: { code: string; action: OAuthAction }) {
    const res = this.post<LoginSuccessResponse>('/auth/google', payload);

    await axios.post('/api/auth/set-cookie', res);

    return res;
  }

  public async login(payload: LoginSchema) {
    const res = await this.post<LoginSuccessResponse>('/auth/login', payload);

    await axios.post('/api/auth/set-cookie', res);

    return res;
  }

  public async logout() {
    await this.delete('/auth/logout', {
      isPrivateRoute: true,
    });

    await axios.delete('/api/auth/delete-cookie');
  }

  public changePassword(payload: Omit<ChangePasswordSchema, 'confirmPassword'>) {
    return this.patch('/auth/password', payload, {
      isPrivateRoute: true,
    });
  }
}

export const authService = new AuthService();
