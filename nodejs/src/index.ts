import { CheckoutController } from "./controllers/checkout.controller";
import { HttpServer } from "./infra/http-server";
import { AccountQueue } from "./infra/message-broker/account.queue";
import { SubscriptionQueue } from "./infra/message-broker/subscription.queue";
import { CheckoutRepository } from "./infra/repositories/checkout-repository";

export function initServer(port: number) {
    const httpServer = new HttpServer();
    const checkoutRepository = new CheckoutRepository();
    
    new CheckoutController(
        checkoutRepository, 
        new AccountQueue(),
        new SubscriptionQueue(),
        httpServer);

    httpServer.listen(port);
}

initServer(8080);