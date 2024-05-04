import { FrequencyUnits, TenureTypes } from "../enums";

/** Value object */
export class BillingCycle {

    constructor(
        public frequencyUnit: FrequencyUnits,
        public frequencyCount: number,
        public tenureType: TenureTypes,
        public sequence: number,
        public totalCycles: number,
        public price: number,
        public currency: string
    ) { }
}

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