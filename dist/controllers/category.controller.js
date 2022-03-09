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
exports.deleteCategory = exports.editCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
/**
 * Get all categories
 * @param req
 * @param res
 */
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.find({ status: true });
    res.json(categories);
});
exports.getCategories = getCategories;
/**
 * Get category by id
 * @param req
 * @param res
 */
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_model_1.default.findOne({ _id: id, status: true });
    res.json(category);
});
exports.getCategory = getCategory;
/**
 * Create a new category
 * @param req
 * @param res
 */
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const category = new category_model_1.default({ title, description });
    //Save user
    yield category.save();
    res.json({
        category,
    });
});
exports.createCategory = createCategory;
/**
 * Edit category
 * @param req
 * @param res
 */
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { _id } = _a, category = __rest(_a, ["_id"]);
    const existCategory = yield category_model_1.default.findOne({ title: category.title });
    if (existCategory && (existCategory._id.toString() !== id.toString())) {
        return res.status(400).json({
            message: 'Category is already exist',
        });
    }
    //Save changes
    const categoryDB = yield category_model_1.default.findByIdAndUpdate(id, category, { new: true });
    res.json(categoryDB);
});
exports.editCategory = editCategory;
/**
 * Delete category
 * @param req
 * @param res
 */
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Change status false and keep the record.
    const category = yield category_model_1.default.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(category);
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map