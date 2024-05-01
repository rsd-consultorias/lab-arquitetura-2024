import cors from "cors";
import express, { Request, Response } from "express";

export interface IHttpServer {
    register(url: string, method: string, callback: Function): Promise<void>;
    listen(port: number, host: string): void;
}

export class HttpServer implements IHttpServer {
    app: any;

    constructor() {
        const corsOptions = {
            origin: [
                'http://localhost:4200',
                'http://192.168.100.64:4200'
            ]
        };

        this.app = express();
        this.app.use(cors(corsOptions));
        this.app.use(express.json({ limit: '1mb' }));
        this.app.use(express.urlencoded({ limit: '1mb', extended: true }));
        this.app.set('trust proxy', true);
    }

    async register(url: string, method: string, callback: Function): Promise<void> {
        this.app[method](url, async function (req: Request, res: Response) {
            res.json(await callback(req.params, req.body, req.query));
        });
    }

    listen(port: number, host: string): void {
        this.app.listen(port, host);
        console.log(`${new Date().toISOString()} Respondendo no host ${host}`);
        console.log(`${new Date().toISOString()} Escutando porta ${port}`);
        console.log(`${new Date().toISOString()} Ambiente ${process.env.NODE_ENV || 'development'}`);
    }
}