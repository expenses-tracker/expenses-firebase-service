import mongoose = require("mongoose");
import { ConfigService } from "../configs/config.service";

import { logger, LOG_LEVEL } from "../configs/global.config";
import { IReferenceData, ReferenceDataModel } from "../models/referencedata.model";

export class ReferenceDataDbService {

    model = ReferenceDataModel;

    constructor() {
        logger.log(LOG_LEVEL.verbose, `ReferenceDataDbService initialized`);
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

    find() {
        return this.model.find({}).exec();
    }

    findById(id: string) {
        return this.model.findById(id).exec();
    }

    findByAttribute(attr: string, value: any) {
        return this.model.find({ [attr]: value }).exec();
    }

    insert(doc: IReferenceData) {
        return this.model.create(doc);
    }

    update(doc: IReferenceData) {
        return this.model.updateOne({_id: doc._id}, doc).exec();
    }

    delete(_id: string) {
        return this.model.deleteOne({_id: _id}).exec();
    }

    deleteAll() {
        return this.model.deleteMany({}).exec();
    }
}