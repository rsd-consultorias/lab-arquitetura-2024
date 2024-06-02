import { SubscriptionState } from "../../enums";
import { Entity } from "../base/base.entity";
import { CustomerInfo } from "./customer-info";
import { ExecutionCycle } from "../value-objects/execution-cycle.vo";
import { SubscriptionDetails } from "../value-objects/subscription-details.vo";

export class Subscription extends Entity {

    constructor(
        public token: string,
        public planToken: string,
        public status: SubscriptionState,
        public customerInfoId: string,
        public executionCycles: Array<ExecutionCycle>,
        public statusChangeNote: string,
        public statusUpdateTime: Date,
        public startTime: Date,
        public paymentInfoId: string,
        public subscriptionDetails: SubscriptionDetails
    ) { 
        super();
    }
}