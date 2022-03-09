import { Router } from 'express';
import { check } from 'express-validator';

import { existEmail, existUserById, existUserByStatus } from '../helpers/dbValidatorHelper';
import { validateFields } from '../middlewares/fieldValidator';

/** Controller methods */
import { getSkills, getSkill, createSkill, editSkill, deleteSkill } from '../controllers/skill.controller';

import { validateJWT } from '../middlewares/jwtValidator';


const router = Router();

/** 
 * Get all skills 
*/
router.get('/', getSkills);

/** 
 * Get skill by id 
*/
router.get('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    check('id').custom(existUserByStatus),
    validateFields,
], getSkill);

/**
 * Create skill
 */
router.post('/', [
    validateJWT,
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password is required and must be greater than 6 characters').isLength({ min:6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(existEmail),
    validateFields  
], createSkill);

/**
 * Edit skill 
*/
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    check('email', 'Email is not valid').isEmail(),
    validateFields,
], editSkill);

/** 
 * Delete skill 
*/
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
], deleteSkill);

export default router; 