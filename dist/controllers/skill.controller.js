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
exports.deleteSkill = exports.editSkill = exports.createSkill = exports.getSkill = exports.getSkills = void 0;
const skill_model_1 = __importDefault(require("../models/skill.model"));
/**
 * Get all skills
 * @param req
 * @param res
 */
const getSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield skill_model_1.default.find();
    res.json({
        projects,
    });
});
exports.getSkills = getSkills;
/**
 * Get skill by id
 * @param req
 * @param res
 */
const getSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield skill_model_1.default.findOne({ _id: id });
    res.json(project);
});
exports.getSkill = getSkill;
/**
 * Create a new skill
 * @param req
 * @param res
 */
const createSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const project = new skill_model_1.default({ name, email, password });
    //Save user
    yield project.save();
    res.json({
        project,
    });
});
exports.createSkill = createSkill;
/**
 * Edit skill
 * @param req
 * @param res
 */
const editSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { _id, password } = _a, user = __rest(_a, ["_id", "password"]);
    const existEmail = yield skill_model_1.default.findOne({ email: user.email });
    if (existEmail && (existEmail._id.toString() !== id.toString())) {
        return res.status(400).json({
            message: 'Email is already exist',
        });
    }
    //Save changes
    const userDB = yield skill_model_1.default.findByIdAndUpdate(id, user, { new: true });
    res.json(userDB);
});
exports.editSkill = editSkill;
/**
 * Delete skill
 * @param req
 * @param res
 */
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Change status false and keep the record.
    const user = yield skill_model_1.default.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(user);
});
exports.deleteSkill = deleteSkill;
//# sourceMappingURL=skill.controller.js.map