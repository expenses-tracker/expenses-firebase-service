import { UserMetaData } from "../models/userMetaData.model";

export class MonthlyPaymentTypeExpensesQueryBuilder {
  static build(userData: UserMetaData): any {
    return [
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
            'paymentType': '$paymentType', 
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
  }
}