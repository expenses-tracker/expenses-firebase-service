import { logger, LOG_LEVEL } from "../configs/global.config";
import { SearchMetaData } from "../models/searchMetaData.model";
import { UserMetaData } from "../models/userMetaData.model";
import { SearchDbService } from "./search-db.service";

let instance: SearchService;

export class SearchService {
    dbService = new SearchDbService();

    constructor() {
        logger.log(LOG_LEVEL.info, `SearchService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new SearchService();
        }
        return instance;
    }

    async searchData(userData: UserMetaData, searchAttributes: SearchMetaData) {
        return await this.dbService.search(userData, searchAttributes);
    }
}