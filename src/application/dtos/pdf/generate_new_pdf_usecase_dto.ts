export interface GenerateNewPdfUseCaseRequestDTO {
  userId: string;
  stored_file_name: string;
  pages: number[];
}

export interface GenerateNewPdfUseCaseResponseDTO {
  id: string;

  original_file_name: string;

  stored_file_name: string;

  type: string;

  total_pages: number;

  pages_included?: number[];

  url: string;

  createdAt: Date;
}
