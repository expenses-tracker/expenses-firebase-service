import { UserMetaData } from "../models/userMetaData.model";

export class MonthYearExpensesQueryBuilder {
    static build(userData: UserMetaData, dateRange: {from: string, to: string}) {
        const monthYearExpensesQuery = [
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
                    },
                    'categories': {
                        '$addToSet': '$category'
                    }
                }
            }
        ];
        return monthYearExpensesQuery;
    }
}