import { FrequencyUnits, TenureTypes } from "../../enums";
import { ValueObject } from "../base/base.value-object";

/** Value object */
export class BillingCycle extends ValueObject {

    constructor(
        public frequencyUnit: FrequencyUnits,
        public frequencyCount: number,
        public tenureType: TenureTypes,
        public sequence: number,
        public totalCycles: number,
        public price: number,
        public currency: string
    ) { 
        super();
    }
}