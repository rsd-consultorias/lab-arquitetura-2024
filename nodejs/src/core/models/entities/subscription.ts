import { SubscriptionState } from "../../enums";
import { Entity } from "../base/base.entity";
import { BuyerInfo } from "./buyer-info";
import { ExecutionCycle } from "../value-objects/execution-cycle.vo";
import { SubscriptionDetails } from "../value-objects/subscription-details.vo";

export class Subscription extends Entity {

    constructor(
        public token: string,
        public status: SubscriptionState,
        public statusChangeNote: string,
        public statusUpdateTime: Date,
        public planToken: string,
        public quantity: number,
        public startTime: Date,
        public subscriber: BuyerInfo,
        public executionCycles: Array<ExecutionCycle>,
        public subscriptionDetails: SubscriptionDetails,
        public paymentInfoId: string
    ) { 
        super();
    }
}