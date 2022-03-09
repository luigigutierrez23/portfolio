import { Router } from 'express';
import { check } from 'express-validator';

/** Middlewares */
import { validateFields } from '../middlewares/fieldValidator';
import { validateJWT } from '../middlewares/jwtValidator';

/** Helpers */
import { existProjectById, existProjectByStatus } from '../helpers/projectHelper';

/** Controller methods */
import { getProjects, createProject, editProject, deleteProject, getProject } from '../controllers/project.controller';



const router = Router();

/** 
 * Get all projects 
*/
router.get('/', getProjects);

/** 
 * Get project by id 
*/
router.get('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existProjectById),
    check('id').custom(existProjectByStatus),
    validateFields,
], getProject);

/**
 * Create project
 */
router.post('/', [
    validateJWT,
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is not valid').notEmpty(),
    check('date', 'Date is required').notEmpty(),
    check('progress', 'Progress is required').notEmpty(),
    check('progress', 'Progress must be a numeber').isNumeric(),
    validateFields  
], createProject);

/**
 * Edit project 
*/
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existProjectById),
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is not valid').notEmpty(),
    check('date', 'Date is required').notEmpty(),
    check('progress', 'Progress is required').notEmpty(),
    check('progress', 'Progress must be a numeber').isNumeric(),
    validateFields,
], editProject);

/** 
 * Delete project 
*/
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existProjectById),
    validateFields,
], deleteProject);

export default router; 