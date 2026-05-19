export interface LoginUseCaseRequestDTO {
  email: string;
  password: string;
}

export interface LoginUseCaseResponseDTO {
  userId: string;
  userUUID: string;
  name: string;
  email: string;
}
