import { UserMetaData } from "../models/userMetaData.model";

export class MonthYearIncomeQueryBuilder {
    static build(userData: UserMetaData, dateRange: {from: string, to: string}): any {
        const monthYearIncomeQuery = [
            {
                '$match': {
                  'createdBy': userData.fullName,
                  'dated': { $gte: new Date(dateRange.from), $lte: new Date(dateRange.to) }
                }
              },
            {
                '$group': {
                    '_id': {
                        'month': {
                            '$month': '$dated'
                        },
                        'year': {
                            '$year': '$dated'
                        }
                    },
                    'amount': {
                        '$sum': '$amount'
                    },
                    'paymentTypes': {
                        '$addToSet': '$paymentType'
                    }
                }
            }
        ];
        return monthYearIncomeQuery;
    }
}