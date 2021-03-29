import mongoose, { Schema, model, SchemaTypes } from "mongoose";

export interface IReferenceData {
    _id: string;
    currency: any;
    securityQuestions: any;
}; 

type ReferenceData = mongoose.Document & IReferenceData; 

const ReferenceDataSchema = new Schema({
    currency: { type: SchemaTypes.Map },
    securityQuestions: { type: SchemaTypes.Map }
});

export const ReferenceDataModel = model<ReferenceData>('referencedatas', ReferenceDataSchema);