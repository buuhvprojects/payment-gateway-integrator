import * as dotenv from 'dotenv';
import BuuhVModules from '@buuhvprojects/chassis-microservice/dist/buuhv.modules';
import Server, { Config } from '@buuhvprojects/chassis-microservice/dist/server';
import { Server as ServerIO } from 'socket.io';
import {
    Express
} from 'express';
import postRoutes from './interfaces/routes.post';
import getRoutes from './interfaces/routes.get';
import putRoutes from './interfaces/routes.put';
import patchRoutes from './interfaces/routes.patch';
import deleteRoutes from './interfaces/routes.delete';
import connection from './infrastructure/orm/mongoose';
import defaultConfig from './common/config';

dotenv.config();

class MyModules extends BuuhVModules {
    constructor(app: Express, io: ServerIO, config: Config) {
        super(app, io, config);
        connection.useDb(defaultConfig.mongo.DATABASE);
        this.app.get('/health', (_, res) => res.send('OK'));
        this.app.use(postRoutes)
        this.app.use(getRoutes)
        this.app.use(putRoutes)
        this.app.use(patchRoutes)
        this.app.use(deleteRoutes)
    }
}

function myApp() {
    const server = new Server(MyModules, {
        appName: 'P G Integrator',
        port: parseInt(process.env.PORT),
        enableSocket: false,
        cors: [/(.*)localhost(:)?(.*)?/, /undefined/, /null/]
    });
    server.start();
}
myApp();