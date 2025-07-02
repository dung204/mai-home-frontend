import { envClient } from '@/base/config/env-client.config';

export class AuthUtils {
  static redirectToGoogleLoginPage() {
    const url = new URL('https://accounts.google.com/o/oauth2/auth');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', envClient.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    url.searchParams.set('scope', 'openid email profile');
    url.searchParams.set('redirect_uri', `${window.location.origin}/`);

    window.location.href = url.href;
  }
}
