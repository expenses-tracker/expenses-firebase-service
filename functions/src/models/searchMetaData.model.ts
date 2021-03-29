export interface SearchMetaData {
    type: string;
    searchString: string;
    timeFrame: {
        from: Date,
        to: Date
    };
    category?: string;
    paymentType: string;
}