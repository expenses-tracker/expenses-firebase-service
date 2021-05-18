import { UserMetaData } from "../models/userMetaData.model";

export class MonthYearIncomeQueryBuilder {
    static build(userData: UserMetaData, dateRange: {from: string, to: string}): any {
        return [
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
                            '$month': { date: '$dated', timezone: '+0530' }
                        },
                        'year': {
                            '$year': { date: '$dated', timezone: '+0530' }
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
    }
}