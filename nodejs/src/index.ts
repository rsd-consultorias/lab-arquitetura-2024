import { CheckoutController } from "./controllers/checkout.controller";
import { HttpServer, IHttpServer } from "./infra/http-server.interface";

export function initServer(port: number) {
    const httpServer = new HttpServer();
    
    new CheckoutController(httpServer);

    httpServer.listen(port);
}

initServer(8080);