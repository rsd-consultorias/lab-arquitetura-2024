import { BillingCycle } from "./billing-cycle.vo";

export class Plan {

    constructor(
        public token: string,
        public sku: string,
        public name: string,
        public description: string,
        public active: boolean,
        public billingCycles: Array<BillingCycle>
    ) { }
}