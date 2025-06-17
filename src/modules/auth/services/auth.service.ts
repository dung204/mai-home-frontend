import { HttpClient } from '@/base/lib';
import {
  GetOtpSchema,
  LoginSchema,
  LoginSuccessResponse,
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

  public login(payload: LoginSchema) {
    return this.post<LoginSuccessResponse>('/auth/login', payload);
  }

  public logout() {
    return this.delete<LoginSuccessResponse>('/auth/logout', {
      isPrivateRoute: true,
    });
  }
}

export const authService = new AuthService();
