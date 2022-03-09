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
exports.existSkillByStatus = exports.existSkillById = void 0;
const skill_model_1 = __importDefault(require("../models/skill.model"));
/****
 *
 *  Skill Helpers
 *
 */
/**
 * Verify if skill exist
 * @param id
 */
const existSkillById = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield skill_model_1.default.findById(id);
    if (!exist) {
        throw new Error(`Skill id: ${id} doesn't exist.`);
    }
});
exports.existSkillById = existSkillById;
/**
 * Verify if skill exist by status
 * @param id
 */
const existSkillByStatus = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield skill_model_1.default.findOne({ _id: id, status: true });
    if (!exist) {
        throw new Error(`Skill id: ${id} doesn't exist.`);
    }
});
exports.existSkillByStatus = existSkillByStatus;
//# sourceMappingURL=skillHelper.js.map