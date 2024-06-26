import { Sequelize } from "sequelize";
import { Configuration } from "./configuration";
import { OrderController } from "./controllers/order.controller";
import { HttpServer } from "./infra/http-server";
import { AccountQueueService } from "./infra/message-broker/account-queue.service";
import { InvoicingQueueService } from "./infra/message-broker/invoicing-queue.service";
import { OrderRepository } from "./infra/repositories/order.repository";
import { PayPal } from "./infra/services/paypal.service";

export function initServer(port: number) {
    const httpServer = new HttpServer(__dirname);
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../.data/cache-transactions-db',
        logging: true,
    });

    sequelize.sync();

    const orderRepository = new OrderRepository(sequelize);
    
    new OrderController(
        orderRepository, 
        new AccountQueueService(),
        new InvoicingQueueService(),
        new PayPal.v1.PayPalService(),
        httpServer);

    httpServer.listen(port, '0.0.0.0');
}

initServer(parseInt(Configuration.SERVER_PORT));