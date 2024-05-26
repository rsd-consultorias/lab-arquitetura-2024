import { SubscriptionState } from "../enums";
import { ExecutionCycle } from "./billing-cycle.vo";
import { BuyerInfo } from "./buyer-info";

export class Subscription {

    constructor(
        public token: string,
        public status: SubscriptionState,
        public statusChangeNote: string,
        public statusUpdateTime: Date,
        public planToken: string,
        public quantity: number,
        public startTime: Date,
        public subscriber: BuyerInfo,
        public executionCycles: Array<ExecutionCycle>
    ) { }
}