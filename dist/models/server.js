"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import {  } from 'express-fileupload'
const enumPath_1 = require("../common/types/enumPath");
const connection_1 = __importDefault(require("../database/connection"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
class Server {
    constructor() {
        this.path = enumPath_1.EnumPath;
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, connection_1.default)();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS 
        this.app.use((0, cors_1.default)());
        //Body reading
        this.app.use(express_1.default.json());
        //Public folder
        this.app.use(express_1.default.static('public'));
        //File upload
        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));
    }
    routes() {
        this.app.use(this.path.user, user_route_1.default);
        this.app.use(this.path.auth, auth_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map