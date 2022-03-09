import { Router } from 'express';
import { check } from 'express-validator';

import { existCategoryById, existCategoryByStatus } from '../helpers/dbValidatorHelper';
import { validateFields } from '../middlewares/fieldValidator';

/** Controller methods */
import { getCategories, getCategory, createCategory, editCategory, deleteCategory } from '../controllers/category.controller';

import { validateJWT } from '../middlewares/jwtValidator';


const router = Router();

/** 
 * Get all categories 
*/
router.get('/', getCategories);

/** 
 * Get category by id 
*/
router.get('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    check('id').custom(existCategoryByStatus),
    validateFields,
], getCategory);

/**
 * Create category
 */
router.post('/', [
    validateJWT,
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    validateFields  
], createCategory);

/**
 * Edit category 
*/
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
], editCategory);

/** 
 * Delete category 
*/
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
], deleteCategory);

export default router; 