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
              '$month': '$dated'
            }, 
            'category': '$category', 
            'year': {
              '$year': '$dated'
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