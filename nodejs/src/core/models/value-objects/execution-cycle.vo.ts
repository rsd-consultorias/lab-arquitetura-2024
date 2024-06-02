import { FrequencyUnits, TenureTypes } from "../../enums";
import { ValueObject } from "../base/base.value-object";
import { BillingCycle } from "./billing-cycle.vo";

/** Value object */
export class ExecutionCycle extends BillingCycle {

    constructor(
        public frequencyUnit: FrequencyUnits,
        public frequencyCount: number,
        public tenureType: TenureTypes,
        public sequence: number,
        public totalCycles: number,
        public price: number,
        public currency: string,
        public cyclesCompleted: number,
        public cyclesRemaining: number,
        public nextBillingTime: Date,
        public finalPaymentTime: Date,
        public lastPaymentTime?: Date
    ) {
        super(
            frequencyUnit,
            frequencyCount,
            tenureType,
            sequence,
            totalCycles,
            price,
            currency
        );
    }
}