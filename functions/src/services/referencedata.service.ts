import { logger, LOG_LEVEL } from "../configs/global.config";
import { ReferenceDataDbService } from "./referencedata-db.service";
import { IReferenceData } from "../models/referencedata.model";

let instance: ReferenceDataService;

export class ReferenceDataService {
    dbService = new ReferenceDataDbService();
    constructor() {
        logger.log(LOG_LEVEL.info, `ReferenceDataService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new ReferenceDataService();
        }
        return instance;
    }

    async findAllReferenceData() {
        return await this.dbService.find();
    }

    async findReferenceDataById(id: string) {
        return await this.dbService.findById(id);
    }

    async findReferenceDataByAttribute(attr: string, value: any) {
        return await this.dbService.findByAttribute(attr, value);
    }

    async insertReferenceData(doc: IReferenceData) {
        return await this.dbService.insert(doc);
    }

    // async updateReferenceData(_id: string, doc: IReferenceData) {
    //     const currentReferenceData = await this.dbService.findById(_id);
    //     if (!currentReferenceData) {
    //         return Promise.resolve(`No data found`);
    //     }
    //     const docToUpdate: IReferenceData = {
    //         _id: _id,
    //         description: doc.description,
    //         amount: doc.amount,
    //         paymentType: doc.paymentType,
    //         dated: doc.dated,
    //         createdBy: currentReferenceData.get('createdBy'),
    //         updatedBy: doc.updatedBy,
    //         createdOn: currentReferenceData.get('createdOn'),
    //         updatedOn: new Date()
    //     };
    //     return await this.dbService.update(docToUpdate);
    // }

    async deleteReferenceData(_id: string) {
        const currentReferenceData = await this.dbService.findById(_id);
        if (!currentReferenceData) {
            return Promise.resolve(`No data found`);
        }
        return await this.dbService.delete(_id);
    }

    async deleteAllReferenceData() {
        return await this.dbService.deleteAll();
    }
}