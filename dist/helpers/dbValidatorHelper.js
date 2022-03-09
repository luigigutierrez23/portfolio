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
exports.existCategoryByStatus = exports.existCategoryById = exports.existUserByStatus = exports.existUserById = exports.existEmail = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
/****
 *
 *  User Helpers
 *
 */
/**
 * Verify if email exist
 * @param email
 */
const existEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.default.findOne({ email });
    if (exist) {
        throw new Error(`Email: ${email} is already registered.`);
    }
});
exports.existEmail = existEmail;
/**
 * Verify if user exist
 * @param id
 */
const existUserById = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.default.findById(id);
    if (!exist) {
        throw new Error(`User id: ${id} doesn't exist.`);
    }
});
exports.existUserById = existUserById;
/**
 * Verify if user exist by status
 * @param id
 */
const existUserByStatus = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.default.findOne({ _id: id, status: true });
    if (!exist) {
        throw new Error(`User id: ${id} doesn't exist.`);
    }
});
exports.existUserByStatus = existUserByStatus;
/****
 *
 *  Category Helpers
 *
 */
/**
 * Verify if category exist
 * @param id
 */
const existCategoryById = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield category_model_1.default.findById(id);
    if (!exist) {
        throw new Error(`Category id: ${id} doesn't exist.`);
    }
});
exports.existCategoryById = existCategoryById;
/**
 * Verify if user exist by status
 * @param id
 */
const existCategoryByStatus = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield category_model_1.default.findOne({ _id: id, status: true });
    if (!exist) {
        throw new Error(`Category id: ${id} doesn't exist.`);
    }
});
exports.existCategoryByStatus = existCategoryByStatus;
//# sourceMappingURL=dbValidatorHelper.js.map