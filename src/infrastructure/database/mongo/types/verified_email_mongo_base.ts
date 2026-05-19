export interface VerifiedEmailMongoBase {
    email: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}