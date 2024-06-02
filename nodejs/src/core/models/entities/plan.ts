import { Entity } from "../base/base.entity";
import { BillingCycle } from "../value-objects/billing-cycle.vo";
import { PlanDetail } from "../value-objects/plan-detail.vo";

export class Plan extends Entity {

    constructor(
        public token: string,
        public sku: string,
        public name: string,
        public description: string,
        public active: boolean,
        public billingCycles: Array<BillingCycle>,
        public planDetails: Array<PlanDetail>
    ) { 
        super();
    }
}