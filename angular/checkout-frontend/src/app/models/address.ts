export class Address {
    constructor(
        public postalCode: string,
        public street: string,
        public district: string,
        public city: string,
        public state: string,
        public countryCode: string,
        public complement?: string
    ) { }
}