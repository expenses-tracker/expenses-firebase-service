import { UserMetaData } from "../models/userMetaData.model";

export class MonthlyCategoryExpensesQueryBuilder {
  static build(userData: UserMetaData): any {
    const monthlyCategoryExpensesQuery = [
      {
        '$match': {
          'createdBy': userData.fullName
        }
      },
      {
        '$group': {
          '_id': {
            'month': {
              '$month': { date: '$dated', timezone: '+0530' }
            }, 
            'category': '$category', 
            'year': {
              '$year': { date: '$dated', timezone: '+0530' }
            }
          }, 
          'amount': {
            '$sum': '$amount'
          }
        }
      }
    ];
    return monthlyCategoryExpensesQuery;
  }
}