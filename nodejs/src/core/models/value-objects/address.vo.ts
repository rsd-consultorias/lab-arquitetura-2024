import { ValueObject } from "../base/base.value-object";

/** Value object */
export class Address extends ValueObject {
    constructor(
        public postalCode: string,
        public street: string,
        public district: string,
        public city: string,
        public state: string,
        public countryCode: string,
        public complement?: string
    ) { 
        super();
    }
}