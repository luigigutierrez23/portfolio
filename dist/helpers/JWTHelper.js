"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generate a Json Web Token
 * @param uid
 * @returns
 */
const getJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETKEY, {
            expiresIn: '8h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Failed to generate token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.getJWT = getJWT;
//# sourceMappingURL=jwtHelper.js.map