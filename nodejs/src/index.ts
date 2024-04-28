import { Configuration } from "./configuration";
import { CheckoutController } from "./controllers/checkout.controller";
import { HttpServer } from "./infra/http-server";
import { AccountQueueService } from "./infra/message-broker/account.queue";
import { SubscriptionQueueService } from "./infra/message-broker/subscription.queue";
import { CheckoutRepository } from "./infra/repositories/checkout-repository";

export function initServer(port: number) {
    const httpServer = new HttpServer();
    const checkoutRepository = new CheckoutRepository();
    
    new CheckoutController(
        checkoutRepository, 
        new AccountQueueService(),
        new SubscriptionQueueService(),
        httpServer);

    httpServer.listen(port);
}

initServer(parseInt(Configuration.SERVER_PORT));