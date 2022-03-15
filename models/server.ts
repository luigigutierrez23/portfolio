import express, { Application } from 'express';
import cors from 'cors';
import path from 'path'

/** Enums */
import { EnumPath } from '../common/types/enums/enumPath';

/** Database connection */
import dbConnection from '../database/connection';

/** Routes */
import userRoutes from '../routes/user.route';
import authRoutes from '../routes/auth.route';
import projectRoutes from '../routes/projects.route';
import skillRoutes from '../routes/skill.route';
import categoryRoutes from '../routes/category.route';

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

        //Client side folder
        this.app.use(express.static('wwwroot'));
    }

    routes(){
        this.app.use(this.path.user, userRoutes);
        this.app.use(this.path.auth, authRoutes);
        this.app.use(this.path.project, projectRoutes);
        this.app.use(this.path.skill, skillRoutes);
        this.app.use(this.path.category, categoryRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }
}

export default Server;