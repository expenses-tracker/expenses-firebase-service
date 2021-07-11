import { logger, LOG_LEVEL } from "../configs/global.config";
import { CategoriesDbService } from "./categories-db.service";
import { ICategory } from "../models/categories.model";
import { UserMetaData } from "../models/userMetaData.model";
import { CommonsUtil } from "../utils/commons.util";

let instance: CategoryService;

export class CategoryService {
    dbService = new CategoriesDbService();
    constructor() {
        logger.log(LOG_LEVEL.info, `CategoriesService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new CategoryService()
        }
        return instance
    }

    async findAllCategories(userData: UserMetaData) {
        return this.dbService.find(userData);
    }

    async findCategoryById(id: string) {
        return this.dbService.findById(id);
    }

    async findCategoryByAttribute(attr: string, value: any) {
        return this.dbService.findByAttribute(attr, value);
    }

    async insertCategory(doc: ICategory) {
        return this.dbService.insert(doc);
    }

    async updateCategory(_id: string, doc: ICategory) {
        const currentCategory = await this.dbService.findById(_id);
        if (!currentCategory) {
            return Promise.reject(CommonsUtil.dataNotFound());
        }
        const docToUpdate: ICategory = {
            _id: _id,
            isDefault: doc.isDefault,
            description: doc.description,
            type: doc.type,
            createdBy: currentCategory.get('createdBy'),
            updatedBy: doc.updatedBy,
            createdOn: currentCategory.get('createdOn'),
            updatedOn: new Date()
        };
        const updateResult = await this.dbService.update(docToUpdate);
        if (updateResult.ok === 1) {
            return this.dbService.findById(_id);
        } else {
            return updateResult;
        }
    }

    async deleteCategory(_id: string) {
        const currentCategory = await this.dbService.findById(_id);
        if (!currentCategory) {
            return Promise.reject(CommonsUtil.dataNotFound());
        }
        return this.dbService.delete(_id);
    }

    async deleteAllCategory() {
        return this.dbService.deleteAll();
    }
}