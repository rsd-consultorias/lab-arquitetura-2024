import { randomUUID } from "crypto";

export abstract class Entity {

    public readonly id: string | undefined;
    private rules: Function[] = [];
    private errors: string[] = [];

    constructor() {
        this.id = randomUUID();
    }

    protected addValidation(rule: Function) {
        this.rules.push(rule);
    }

    private addError(error: string) {
        this.errors.push(error);
    }

    public isValid(): boolean {
        let valid = true;

        for (let func of this.rules) {
            let result = func();

            if (result != undefined) {
                this.addError(result);
                valid = false;
            }
        }

        return valid;
    }

    public getErrors(): string[] {
        return this.errors;
    }
}