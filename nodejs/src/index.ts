import { CheckoutController } from "./controllers/checkout";
import { HttpServer, IHttpServer } from "./infra/http-server";

export function initServer(port: number) {
    const httpServer = new HttpServer();
    
    new CheckoutController(httpServer);

    httpServer.listen(port);
}

initServer(8080);