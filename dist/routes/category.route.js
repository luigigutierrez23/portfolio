"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/** Middlewares */
const fieldValidator_1 = require("../middlewares/fieldValidator");
const jwtValidator_1 = require("../middlewares/jwtValidator");
/** Helpers */
const categoryHelper_1 = require("../helpers/categoryHelper");
/** Controller methods */
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
/**
 * Get all categories
*/
router.get('/', category_controller_1.getCategories);
/**
 * Get category by id
*/
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(categoryHelper_1.existCategoryById),
    (0, express_validator_1.check)('id').custom(categoryHelper_1.existCategoryByStatus),
    fieldValidator_1.validateFields,
], category_controller_1.getCategory);
/**
 * Create category
 */
router.post('/', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('description', 'Description is required').notEmpty(),
    fieldValidator_1.validateFields
], category_controller_1.createCategory);
/**
 * Edit category
*/
router.put('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(categoryHelper_1.existCategoryById),
    fieldValidator_1.validateFields,
], category_controller_1.editCategory);
/**
 * Delete category
*/
router.delete('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(categoryHelper_1.existCategoryById),
    fieldValidator_1.validateFields,
], category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.route.js.map