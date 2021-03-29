import mongoose, { Schema, model } from "mongoose";

export interface IIncome {
    _id: string;
    description: string;
    amount: number;
    dated: Date;
    paymentType: string;
    tag: string;
    subDescription: string;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}; 

type Income = mongoose.Document & IIncome; 

const IncomeSchema = new Schema({
    description: { type: String },
    amount: { type: Number },
    dated: { type: Schema.Types.Date, default: Date.now },
    paymentType: { type: String },
    tag: { type: String },
    subDescription: { type: String },
    createdOn: { type: Schema.Types.Date, default: Date.now },
    createdBy: { type: String },
    updatedOn: { type: Schema.Types.Date, default: Date.now },
    updatedBy: { type: String }
});

export const IncomeModel = model<Income>('incomes', IncomeSchema);