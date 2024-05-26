import { IHttpServer } from "../../order/infra/http-server";

export class SubscriptionController {
    private readonly CONTROLLER_URL = '/v1';

    constructor(private httpServer: IHttpServer) {
        // Create subscription
        httpServer.register(`${this.CONTROLLER_URL}`, 'post', () => {});
        // Update subscription
        httpServer.register(`${this.CONTROLLER_URL}`, 'put', () => {});
        // Get subscription details
        httpServer.register(`${this.CONTROLLER_URL}/:token`, 'get', () => {});
        // Cancel subscription
        httpServer.register(`${this.CONTROLLER_URL}/:token`, 'delete', () => {});
    }
}