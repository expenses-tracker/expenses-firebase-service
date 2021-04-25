import mongoose, { Schema, model } from "mongoose";

export interface IExpense {
    _id: string;
    description: string;
    dated: Date;
    amount: number;
    paymentType: string;
    category: string;
    tag: string;
    subDescription: string;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}; 

type Expense = mongoose.Document & IExpense; 

const ExpenseSchema = new Schema({
    description: { type: String, index: true },
    dated: { type: Schema.Types.Date, default: Date.now, index: true },
    amount: { type: Number },
    paymentType: { type: String },
    category: { type: String },
    tag: { type: String },
    subDescription: { type: String },
    createdOn: { type: Schema.Types.Date, default: Date.now },
    createdBy: { type: String, index: true },
    updatedOn: { type: Schema.Types.Date, default: Date.now },
    updatedBy: { type: String }
}, { autoIndex: false });
ExpenseSchema.index({ dated: 1, category: 1, paymentType: 1 }, { unique: false });

export const ExpenseModel = model<Expense>('expenses', ExpenseSchema);
ExpenseModel.createIndexes();