"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/** Middlewares */
const jwtValidator_1 = require("../middlewares/jwtValidator");
const fieldValidator_1 = require("../middlewares/fieldValidator");
/** Helpers */
const userHelper_1 = require("../helpers/userHelper");
/** Controller methods */
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
/**
 * Get all users
*/
router.get('/', user_controller_1.getUsers);
/**
 * Get user by id
*/
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(userHelper_1.existUserById),
    (0, express_validator_1.check)('id').custom(userHelper_1.existUserByStatus),
    fieldValidator_1.validateFields,
], user_controller_1.getUser);
/**
 * Create User
 */
router.post('/', [
    (0, express_validator_1.check)('name', 'Name is required').notEmpty(),
    (0, express_validator_1.check)('password', 'Password is required and must be greater than 6 characters').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'Email is not valid').isEmail(),
    (0, express_validator_1.check)('email').custom(userHelper_1.existEmail),
    fieldValidator_1.validateFields
], user_controller_1.createUser);
/**
 * Edit user
*/
router.put('/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(userHelper_1.existUserById),
    (0, express_validator_1.check)('email', 'Email is not valid').isEmail(),
    fieldValidator_1.validateFields,
], user_controller_1.editUser);
/**
 * Delete user
*/
router.delete('/:id', [
    jwtValidator_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(userHelper_1.existUserById),
    fieldValidator_1.validateFields,
], user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map