import { CheckoutController } from "./controllers/checkout.controller";
import { HttpServer } from "./infra/http-server";
import { CheckoutRepository } from "./infra/repositories/checkout-repository";

export function initServer(port: number) {
    const httpServer = new HttpServer();
    const checkoutRepository = new CheckoutRepository();
    
    new CheckoutController(checkoutRepository, httpServer);

    httpServer.listen(port);
}

initServer(8080);