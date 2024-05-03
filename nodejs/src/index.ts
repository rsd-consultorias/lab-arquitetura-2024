import { Sequelize } from "sequelize";
import { Configuration } from "./configuration";
import { TransactionController } from "./controllers/transaction.controller";
import { HttpServer } from "./infra/http-server";
import { AccountQueueService } from "./infra/message-broker/account.queue";
import { SubscriptionQueueService } from "./infra/message-broker/subscription.queue";
import { TransactionRepository } from "./infra/repositories/transaction-repository";
import { PayPal } from "./infra/services/paypal.service";

export function initServer(port: number) {
    const httpServer = new HttpServer();
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../.data/cache-transactions-db',
        logging: true,
    });

    sequelize.sync();

    const transactionRepository = new TransactionRepository(sequelize);
    
    new TransactionController(
        transactionRepository, 
        new AccountQueueService(),
        new SubscriptionQueueService(),
        new PayPal.v1.PayPalService(),
        httpServer);

    httpServer.listen(port, '0.0.0.0');
}

initServer(parseInt(Configuration.SERVER_PORT));