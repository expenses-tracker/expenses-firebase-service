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
    description: { type: String, index: true },
    amount: { type: Number },
    dated: { type: Schema.Types.Date, default: Date.now, index: true },
    paymentType: { type: String },
    tag: { type: String },
    subDescription: { type: String },
    createdOn: { type: Schema.Types.Date, default: Date.now },
    createdBy: { type: String, index: true },
    updatedOn: { type: Schema.Types.Date, default: Date.now },
    updatedBy: { type: String }
}, {  autoIndex: false });
IncomeSchema.index({ dated: -1, paymentType: 1 }, { unique: false });

export const IncomeModel = model<Income>('incomes', IncomeSchema);
