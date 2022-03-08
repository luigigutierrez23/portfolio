"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validate fields with express-validator
 * @param req
 * @param res
 * @param next
 * @returns
 */
const validateFields = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=fieldValidator.js.map