export const APP_NAME = 'PDF-UP';

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  GONE: 410,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  OTP_SENT: 'OTP sent successfully',
  OTP_VERIFIED: 'OTP verified successfully',
  USER_LOGGED_IN: 'User logged in successfully',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  USER_LOGGED_OUT: 'User logged out successfully',
} as const;

export const ERROR_MESSAGES = {
  INVALID_OTP: 'Invalid OTP',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_NOT_VERIFIED: "Email not verified",
  EMAIL_AND_OTP_REQUIRED: 'Email and OTP are required',
  OTP_EXPIRED: 'OTP expired.',
  OTP_ALREADY_SENT: 'OTP already send',
  CREDENTIALS_NOT_SEND: 'Credentials not found',
  OTP_ABSENT: 'otp not present',
  OTP_NOT_MATCH: 'otp not match',
  PASSWORD_NOT_MATCH: 'confirm password and password are not matching.',
  PASSWORD_IS_WRONG: "Password is wrong",
  USER_ALREADY_EXISTS: 'User already exists.',
  USER_NOT_FOUND: 'User not found',
  ACCESS_TOKEN_NOT_FOUND: 'Access token is not found.',
  INVALID_ACCESS_TOKEN: 'Invalid access token.',
  CLOUDINARY_UPLOAD_FAILED: 'Cloudinary upload failure',
} as const;

export const CounterRepositoryKey = {
  USER: 'USER',
  PDF: 'PDF',
};
