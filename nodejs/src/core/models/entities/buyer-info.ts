import { Entity } from "../base/base.entity";

export class BuyerInfo extends Entity {
    constructor(
        public firstName: string,
        public lastName: string,
        public birthDate: Date,
        public fiscalIdentificationNumber: string,
        public token?: string,
        public email?: string,
        public phone?: string
    ) { 
        super();
    }
}