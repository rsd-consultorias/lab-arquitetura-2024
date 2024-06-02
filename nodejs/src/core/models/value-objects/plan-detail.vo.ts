import { ValueObject } from "../base/base.value-object";

export class PlanDetail extends ValueObject {
    constructor(public attribute: string, public description: string) { 
        super();
    }
}