import { UserMetaData } from "../models/userMetaData.model";

export class MonthlyPaymentTypeExpensesQueryBuilder {
  static build(userData: UserMetaData): any {
    const monthlyPaymentTypeExpensesQuery = [
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
            'paymentType': '$paymentType', 
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
    return monthlyPaymentTypeExpensesQuery;
  }
}