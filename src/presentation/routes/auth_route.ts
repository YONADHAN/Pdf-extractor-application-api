import { asyncHandler } from '../../shared/utils/async_handler.js';

import { authController } from '../../container/resolver.js';
import { BaseRoute } from './base_route.js';

export class AuthRoute extends BaseRoute {
  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.post(
      '/login',
      asyncHandler(authController.loginUser.bind(authController)),
    );

    this.router.post(
      '/register',
      asyncHandler(authController.registerUser.bind(authController)),
    );

    this.router.post(
      '/send-otp',
      asyncHandler(authController.sendOtpEmail.bind(authController)),
    );

    this.router.post(
      '/verify-otp',
      asyncHandler(authController.verifyOtp.bind(authController)),
    );

    this.router.post(
      '/logout',
      asyncHandler(authController.logoutUser.bind(authController)),
    );

    this.router.post(
      '/refresh',
      asyncHandler(authController.refreshToken.bind(authController)),
    );
  }
}
