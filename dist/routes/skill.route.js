"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/** Middlewares */
const jwtValidator_1 = require("../middlewares/jwtValidator");
const fieldValidator_1 = require("../middlewares/fieldValidator");
/** Helpers */
const skillHelper_1 = require("../helpers/skillHelper");
/** Controller methods */
const skill_controller_1 = require("../controllers/skill.controller");
const router = (0, express_1.Router)();
/**
 * Get all skills
*/
router.get('/', skill_controller_1.getSkills);
/**
 * Get skill by id
*/
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(skillHelper_1.existSkillById),
    (0, express_validator_1.check)('id').custom(skillHelper_1.existSkillByStatus),
    fieldValidator_1.validateFields,
], skill_controller_1.getSkill);
/**
 * Create skill
 */
router.post('/', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('description', 'Description is required').notEmpty(),
    (0, express_validator_1.check)('value', 'Value is required').notEmpty(),
    (0, express_validator_1.check)('value', 'Value must be a number').isNumeric(),
    fieldValidator_1.validateFields
], skill_controller_1.createSkill);
/**
 * Edit skill
*/
router.put('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(skillHelper_1.existSkillById),
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('description', 'Description is required').notEmpty(),
    (0, express_validator_1.check)('value', 'Value is required').notEmpty(),
    (0, express_validator_1.check)('value', 'Value must be a number').isNumeric(),
    fieldValidator_1.validateFields,
], skill_controller_1.editSkill);
/**
 * Delete skill
*/
router.delete('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(skillHelper_1.existSkillById),
    fieldValidator_1.validateFields,
], skill_controller_1.deleteSkill);
exports.default = router;
//# sourceMappingURL=skill.route.js.map