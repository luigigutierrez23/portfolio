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
exports.Login = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtHelper_1 = require("../helpers/jwtHelper");
/**
 * Login user
 * @param req
 * @param res
 */
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                msg: 'User incorrect.',
            });
        }
        if (!user.status) {
            return res.status(400).json({
                msg: 'Inactive user',
            });
        }
        const validPassword = (0, bcryptjs_1.compareSync)(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: 'Password incorrect',
            });
        }
        const token = yield (0, jwtHelper_1.getJWT)(user.id);
        res.json({
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something was wrong.',
        });
    }
});
exports.Login = Login;
//# sourceMappingURL=auth.controller.js.map