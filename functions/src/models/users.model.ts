import mongoose, { Schema, model } from "mongoose";

export interface ICurrency {
    type: string;
    isDefault? : boolean;
}

export interface ISecurity {
    question: string;
    answer : string;
}

export interface IPreferences {
    currency: ICurrency[];
    security: ISecurity;
}

export interface IUsers {
    _id?: string;
    userId: string;
    email: string;
    password: string;
    fullName: string;
    isLoggedIn: boolean;
    lastLoggedOn?: Date;
    permissions: string[];
    preferences: IPreferences;
    photo?: {
        path: string,
        data: string
    };
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}

type User = mongoose.Document & IUsers; 

const CurrencySchema = new Schema({
    type: {type: String},
    isDefault: {type: Boolean}
}, {_id: false});

const SecuritySchema = new Schema({
    question: {type: String},
    answer: {type: String}
}, {_id: false});

const PreferencesSchema = new Schema({
    currency: { type: [CurrencySchema] },
    security: { type: SecuritySchema }
}, { _id: false });

const UsersSchema = new Schema({
    userId: { type: String },
    email: { type: String },
    password: { type: String },
    fullName: { type: String },
    isLoggedIn: { type: Boolean, default: false },
    lastLoggedOn: { type: Schema.Types.Date, required: false },
    permissions: { type: [String] },
    photo: { type: {
        path: { type: String },
        data: { type: String }
    } },
    preferences: { type: PreferencesSchema },
    createdOn: { type: Schema.Types.Date, default: Date.now },
    createdBy: { type: String },
    updatedOn: { type: Schema.Types.Date, default: Date.now },
    updatedBy: { type: String }
});

export const UsersModel = model<User>('users', UsersSchema);
