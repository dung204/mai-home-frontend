import { pathToRegexp } from 'path-to-regexp';

export class RouteUtils {
  private static privateRoutes = ['/user/*path'];

  static isPrivateRoute(route: string) {
    return this.privateRoutes.some((r) => pathToRegexp(r).regexp.test(route));
  }
}
