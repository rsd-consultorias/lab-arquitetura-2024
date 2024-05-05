import { IHttpServer } from "../infra/http-server";

export class SubscriptionController {
    constructor(private httpServer: IHttpServer) {
        httpServer.register(``, 'post', () => {});
    }
}