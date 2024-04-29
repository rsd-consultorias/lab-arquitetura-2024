import cors from "cors";
import express, { Request, Response } from "express";

export interface IHttpServer {
    register(url: string, method: string, callback: Function): Promise<void>;
    listen(port: number): void;
}

export class HttpServer implements IHttpServer {
    app: any;

    constructor() {
        const corsOptions = {
            origin: [
                'http://localhost:4200',
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

    listen(port: number): void {
        this.app.listen(port);
        console.log(`${new Date().toISOString()} Escutando porta ${port}`);
        console.log(`${new Date().toISOString()} Ambiente ${process.env.NODE_ENV || 'development'}`);
    }
}