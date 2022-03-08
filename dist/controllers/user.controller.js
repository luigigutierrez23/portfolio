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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Get all users
 * @param req
 * @param res
 */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { status: true };
    const users = yield user_model_1.default.find(query);
    res.json({
        users,
    });
});
exports.getUsers = getUsers;
/**
 * Get User by id
 * @param req
 * @param res
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findOne({ _id: id, status: true });
    res.json(user);
});
exports.getUser = getUser;
/**
 * Create a new user
 * @param req
 * @param res
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = new user_model_1.default({ name, email, password });
    /** Encrypt password */
    const salt = (0, bcryptjs_1.genSaltSync)();
    user.password = (0, bcryptjs_1.hashSync)(password, salt);
    //Save user
    yield user.save();
    res.json({
        user,
    });
});
exports.createUser = createUser;
/**
 * Edit user
 * @param req
 * @param res
 */
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { _id, password } = _a, user = __rest(_a, ["_id", "password"]);
    //TODO: Valid with DB
    if (password) {
        const salt = (0, bcryptjs_1.genSaltSync)();
        user.password = (0, bcryptjs_1.hashSync)(password, salt);
    }
    const existEmail = yield user_model_1.default.findOne({ email: user.email });
    if (existEmail && (existEmail._id.toString() !== id.toString())) {
        return res.status(400).json({
            message: 'Email is already exist',
        });
    }
    //Save changes
    const userDB = yield user_model_1.default.findByIdAndUpdate(id, user, { new: true });
    res.json(userDB);
});
exports.editUser = editUser;
/**
 * Delete user
 * @param req
 * @param res
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Change status false and keep the record.
    const user = yield user_model_1.default.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(user);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map