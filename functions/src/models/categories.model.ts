import mongoose, { Schema, model } from "mongoose";

export interface ICategory {
    _id: string;
    description: string;
    isDefault: boolean;
    type: string;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}

type Category = mongoose.Document & ICategory; 

const CategorySchema = new Schema({
    description: { type: String },
    isDefault: { type: Boolean, default: false },
    type: { type: String },
    createdOn: { type: Schema.Types.Date, default: Date.now },
    createdBy: { type: String },
    updatedOn: { type: Schema.Types.Date, default: Date.now },
    updatedBy: { type: String }
});

export const CategoryModel = model<Category>('categories', CategorySchema);