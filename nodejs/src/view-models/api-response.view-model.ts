export class APIResponse<T> {
    constructor(public success: boolean, public message?: string, public body?: T) {
    }
}