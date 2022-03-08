import express, { Application } from 'express';
import cors from 'cors';
// import {  } from 'express-fileupload'


import { EnumPath } from '../common/types/enumPath';
import dbConnection from '../database/connection';

import userRoutes from '../routes/user.route';
import authRoutes from '../routes/auth.route';

class Server{
    private app:Application;
    private port: string;
    private path = EnumPath ;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            await dbConnection();
        } catch (error: any) {
            throw new Error(error);
        }
    }
 
    middlewares(){
        //CORS 
        this.app.use(cors())

        //Body reading
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'));

        //File upload
        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));
    }

    routes(){
        this.app.use(this.path.user, userRoutes);
        this.app.use(this.path.auth, authRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }
}

export default Server;