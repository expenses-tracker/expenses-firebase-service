import mongoose, { Schema, model } from "mongoose";

const PaymentTypesSchema = new Schema({
    description: { type: String },
    isDefault: { type: Boolean, default: false },
    type: { type: String },
    createdOn: { type: Schema.Types.Date, default: Date.now },
    createdBy: { type: String },
    updatedOn: { type: Schema.Types.Date, default: Date.now },
    updatedBy: { type: String }
});

type PaymentType = mongoose.Document & IPaymentTypes; 

export const PaymentTypesModel = model<PaymentType>('paymenttypes', PaymentTypesSchema);

export interface IPaymentTypes {
    _id: string;
    description: string;
    isDefault: boolean;
    type: string;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}; 