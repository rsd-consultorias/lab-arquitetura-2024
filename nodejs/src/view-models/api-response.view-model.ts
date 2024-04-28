export class APIResponse {
    success: boolean = false;
    message?: string;
    body?: any;
    correlationId?: string;
    redirectTo?: string;

    constructor(success: boolean, message: string);
    constructor(success: boolean, message: string, body: any = null) {
        this.success = success;
        this.message = message;
        this.body = body;
    }
}