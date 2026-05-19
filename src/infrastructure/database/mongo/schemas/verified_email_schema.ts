import {Schema} from 'mongoose';
import type { IVerifiedEmailModel } from '../models/verified_email_model.js';


export const VerifiedEmailSchema = new Schema<IVerifiedEmailModel>(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        
    },
    {
            timestamps: true,
    },
    
);