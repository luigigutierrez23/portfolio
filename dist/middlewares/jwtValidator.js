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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/** Models */
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Validate JWT
 * @param req
 * @param res
 * @param next
 * @returns
 */
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('tokenKey');
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETKEY);
        //Read user
        const user = yield user_model_1.default.findById(payload.uid);
        if (!user) {
            return res.status(401).json({
                msg: 'User not found',
            });
        }
        //Verify if user is active
        if (!user.status) {
            return res.status(401).json({
                msg: 'Inactive user',
            });
        }
        // req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid',
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=jwtValidator.js.map