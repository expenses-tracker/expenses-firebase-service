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
    description: { type: String },
    dated: { type: Schema.Types.Date, default: Date.now },
    amount: { type: Number },
    paymentType: { type: String },
    category: { type: String },
    tag: { type: String },
    subDescription: { type: String },
    createdOn: { type: Schema.Types.Date, default: Date.now },
    createdBy: { type: String },
    updatedOn: { type: Schema.Types.Date, default: Date.now },
    updatedBy: { type: String }
});

export const ExpenseModel = model<Expense>('expenses', ExpenseSchema);