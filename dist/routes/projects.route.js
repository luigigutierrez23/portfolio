"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/** Middlewares */
const fieldValidator_1 = require("../middlewares/fieldValidator");
const jwtValidator_1 = require("../middlewares/jwtValidator");
/** Helpers */
const projectHelper_1 = require("../helpers/projectHelper");
/** Controller methods */
const project_controller_1 = require("../controllers/project.controller");
const router = (0, express_1.Router)();
/**
 * Get all projects
*/
router.get('/', project_controller_1.getProjects);
/**
 * Get project by id
*/
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(projectHelper_1.existProjectById),
    (0, express_validator_1.check)('id').custom(projectHelper_1.existProjectByStatus),
    fieldValidator_1.validateFields,
], project_controller_1.getProject);
/**
 * Create project
 */
router.post('/', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('description', 'Description is not valid').notEmpty(),
    (0, express_validator_1.check)('date', 'Date is required').notEmpty(),
    (0, express_validator_1.check)('progress', 'Progress is required').notEmpty(),
    (0, express_validator_1.check)('progress', 'Progress must be a numeber').isNumeric(),
    fieldValidator_1.validateFields
], project_controller_1.createProject);
/**
 * Edit project
*/
router.put('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(projectHelper_1.existProjectById),
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('description', 'Description is not valid').notEmpty(),
    (0, express_validator_1.check)('date', 'Date is required').notEmpty(),
    (0, express_validator_1.check)('progress', 'Progress is required').notEmpty(),
    (0, express_validator_1.check)('progress', 'Progress must be a numeber').isNumeric(),
    fieldValidator_1.validateFields,
], project_controller_1.editProject);
/**
 * Delete project
*/
router.delete('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(projectHelper_1.existProjectById),
    fieldValidator_1.validateFields,
], project_controller_1.deleteProject);
exports.default = router;
//# sourceMappingURL=projects.route.js.map