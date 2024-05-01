export class BuyerInfo {
    constructor(
        public firstName: string,
        public lastName: string,
        public birthDate: Date,
        public fiscalIdentificationNumber: string,
        public email?: string,
        public phone?: string
    ) { }
}