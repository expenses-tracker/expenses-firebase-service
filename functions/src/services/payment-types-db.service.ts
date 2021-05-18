import mongoose = require("mongoose");
import { ConfigService } from "../configs/config.service";

import { logger, LOG_LEVEL } from "../configs/global.config";
import { PaymentTypesModel, IPaymentTypes } from "../models/payment-types.model";
import { UserMetaData } from "../models/userMetaData.model";

export class PaymentTypesDbService {

    model = PaymentTypesModel;

    constructor() {
        logger.log(LOG_LEVEL.verbose, `PaymentTypesDbService initialized`);
    }

    connect() {
        mongoose.connect(ConfigService.mongoUrl(), { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.once('open', () => {
            logger.log(LOG_LEVEL.info, 'Connected to Mongo via Mongoose');
        });
        mongoose.connection.on('error', (err) => {
            logger.log(LOG_LEVEL.error, `Unable to connect to Mongo via Mongoose: ${err}`);
        });
    }

    find(userData: UserMetaData) {
        return this.model.find({createdBy: { $in: [userData.fullName, 'System'] } }).sort({ 'description': 1 }).exec();
    }

    findById(id: string) {
        return this.model.findById(id).exec();
    }

    findByAttribute(attr: string, value: any) {
        return this.model.find({ [attr]: value }).sort({ 'description': 1 }).exec();
    }

    insert(doc: IPaymentTypes) {
        return this.model.create(doc);
    }

    update(doc: IPaymentTypes) {
        return this.model.updateOne({_id: doc._id}, doc).exec();
    }

    delete(_id: string) {
        return this.model.deleteOne({_id: _id}).exec();
    }

    deleteAll() {
        return this.model.deleteMany({}).exec();
    }
}