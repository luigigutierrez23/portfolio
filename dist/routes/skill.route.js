"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const dbValidatorHelper_1 = require("../helpers/dbValidatorHelper");
const fieldValidator_1 = require("../middlewares/fieldValidator");
/** Controller methods */
const skill_controller_1 = require("../controllers/skill.controller");
const jwtValidator_1 = require("../middlewares/jwtValidator");
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
    (0, express_validator_1.check)('id').custom(dbValidatorHelper_1.existUserById),
    (0, express_validator_1.check)('id').custom(dbValidatorHelper_1.existUserByStatus),
    fieldValidator_1.validateFields,
], skill_controller_1.getSkill);
/**
 * Create skill
 */
router.post('/', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('name', 'Name is required').notEmpty(),
    (0, express_validator_1.check)('password', 'Password is required and must be greater than 6 characters').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'Email is not valid').isEmail(),
    (0, express_validator_1.check)('email').custom(dbValidatorHelper_1.existEmail),
    fieldValidator_1.validateFields
], skill_controller_1.createSkill);
/**
 * Edit skill
*/
router.put('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidatorHelper_1.existUserById),
    (0, express_validator_1.check)('email', 'Email is not valid').isEmail(),
    fieldValidator_1.validateFields,
], skill_controller_1.editSkill);
/**
 * Delete skill
*/
router.delete('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidatorHelper_1.existUserById),
    fieldValidator_1.validateFields,
], skill_controller_1.deleteSkill);
exports.default = router;
//# sourceMappingURL=skill.route.js.map