import { logger, LOG_LEVEL } from "../configs/global.config";
import { PaymentTypesDbService } from "./payment-types-db.service";
import { IPaymentTypes } from "../models/payment-types.model";
import { UserMetaData } from "../models/userMetaData.model";

let instance: PaymentTypesService;

export class PaymentTypesService {
    dbService = new PaymentTypesDbService();
    constructor() {
        logger.log(LOG_LEVEL.info, `PaymentTypesService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new PaymentTypesService()
        }
        return instance
    }

    async findAllPaymentTypes(userData: UserMetaData) {
        return await this.dbService.find(userData);
    }

    async findPaymentTypeById(id: string) {
        return await this.dbService.findById(id);
    }

    async findPaymentTypeByAttribute(attr: string, value: any) {
        return await this.dbService.findByAttribute(attr, value);
    }

    async insertPaymentType(doc: IPaymentTypes) {
        return await this.dbService.insert(doc);
    }

    async updatePaymentType(_id: string, doc: IPaymentTypes) {
        const currentPaymentType = await this.dbService.findById(_id);
        if (!currentPaymentType) {
            return Promise.resolve(`No data found`);
        }
        const docToUpdate: IPaymentTypes = {
            _id: _id,
            isDefault: doc.isDefault,
            description: doc.description,
            type: doc.type,
            createdBy: currentPaymentType.get('createdBy'),
            updatedBy: doc.updatedBy,
            createdOn: currentPaymentType.get('createdOn'),
            updatedOn: new Date()
        };
        const updateResult = await this.dbService.update(docToUpdate);
        if (updateResult.ok === 1) {
            return this.dbService.findById(_id);
        } else {
            return updateResult;
        }
    }

    async deletePaymentType(_id: string) {
        const currentPaymentType = await this.dbService.findById(_id);
        if (!currentPaymentType) {
            return Promise.resolve(`No data found`);
        }
        return await this.dbService.delete(_id);
    }

    async deleteAllPaymentType() {
        return await this.dbService.deleteAll();
    }
}