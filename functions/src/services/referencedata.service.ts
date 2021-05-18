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
        return this.dbService.find();
    }

    async findReferenceDataById(id: string) {
        return this.dbService.findById(id);
    }

    async findReferenceDataByAttribute(attr: string, value: any) {
        return this.dbService.findByAttribute(attr, value);
    }

    async insertReferenceData(doc: IReferenceData) {
        return this.dbService.insert(doc);
    }

    async deleteReferenceData(_id: string) {
        const currentReferenceData = await this.dbService.findById(_id);
        if (!currentReferenceData) {
            return Promise.resolve(`No data found`);
        }
        return this.dbService.delete(_id);
    }

    async deleteAllReferenceData() {
        return this.dbService.deleteAll();
    }
}