import { Sequelize } from "sequelize";
import { HttpServer } from "./infra/http-server";
import { Configuration } from "./configuration";

export function initServer(port: number) {
    const httpServer = new HttpServer(__dirname);
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../.data/cache-orders-db',
        logging: true,
    });

    sequelize.sync();

    httpServer.listen(port, '0.0.0.0');
}

initServer(parseInt(Configuration.SERVER_PORT));