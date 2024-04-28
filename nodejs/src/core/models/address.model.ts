export class Address {
    constructor(
        public zipCode: string,
        public street: string,
        public district: string,
        public city: string,
        public state: string,
        public country: string,
        public complement?: string
    ) { }
}