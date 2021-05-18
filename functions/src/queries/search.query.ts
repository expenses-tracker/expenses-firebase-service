import { SearchMetaData } from "../models/searchMetaData.model";
import { UserMetaData } from "../models/userMetaData.model";

export class SearchQueryBuilder {
  static build(userData: UserMetaData, searchAttr: SearchMetaData): any {
    const queryObj: any = {
      createdBy: userData.fullName,
      description: {
        '$regex': new RegExp(`${searchAttr.searchString}`, 'i')
      }
    };
    if (searchAttr.category) {
      queryObj['category'] = searchAttr.category
    }
    if (searchAttr.paymentType) {
      queryObj['paymentType'] = searchAttr.paymentType
    }
    if (searchAttr.timeFrame) {
      queryObj['dated'] = {
        '$gte': new Date(searchAttr.timeFrame.from), 
        '$lte': new Date(searchAttr.timeFrame.to)
      }
    }
    return [
      {
        '$match': queryObj
      }
    ];
  }
}