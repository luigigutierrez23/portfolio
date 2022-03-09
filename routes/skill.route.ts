import { Router } from 'express';
import { check } from 'express-validator';

/** Middlewares */
import { validateJWT } from '../middlewares/jwtValidator';
import { validateFields } from '../middlewares/fieldValidator';

/** Helpers */
import { existSkillById, existSkillByStatus } from '../helpers/skillHelper';

/** Controller methods */
import { getSkills, getSkill, createSkill, editSkill, deleteSkill } from '../controllers/skill.controller';

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
    check('id').custom(existSkillById),
    check('id').custom(existSkillByStatus),
    validateFields,
], getSkill);

/**
 * Create skill
 */
router.post('/', [
    validateJWT,
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('value', 'Value is required').notEmpty(),
    check('value', 'Value must be a number').isNumeric(),
    validateFields  
], createSkill);

/**
 * Edit skill 
*/
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existSkillById),
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('value', 'Value is required').notEmpty(),
    check('value', 'Value must be a number').isNumeric(),
    validateFields,
], editSkill);

/** 
 * Delete skill 
*/
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existSkillById),
    validateFields,
], deleteSkill);

export default router; 