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

  public handleGoogleAuth(payload: { code: string; action: OAuthAction }) {
    return this.post<LoginSuccessResponse>('/auth/google', payload);
  }

  public login(payload: LoginSchema) {
    return this.post<LoginSuccessResponse>('/auth/login', payload);
  }

  public logout() {
    return this.delete<LoginSuccessResponse>('/auth/logout', {
      isPrivateRoute: true,
    });
  }

  public changePassword(payload: Omit<ChangePasswordSchema, 'confirmPassword'>) {
    return this.patch('/auth/password', payload, {
      isPrivateRoute: true,
    });
  }
}

export const authService = new AuthService();
