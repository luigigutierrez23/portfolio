import { Router } from 'express';
import { check } from 'express-validator';

/** Middlewares */
import { validateFields } from '../middlewares/fieldValidator';

/** Controller methods */
import { getProjects, createProject, editProject, deleteProject, getProject } from '../controllers/project.controller';

import { validateJWT } from '../middlewares/jwtValidator';


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
    validateFields,
], getProject);

/**
 * Create project
 */
router.post('/', [
    validateJWT,
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password is required and must be greater than 6 characters').isLength({ min:6 }),
    check('email', 'Email is not valid').isEmail(),
    validateFields  
], createProject);

/**
 * Edit project 
*/
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('email', 'Email is not valid').isEmail(),
    validateFields,
], editProject);

/** 
 * Delete project 
*/
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    validateFields,
], deleteProject);

export default router; 