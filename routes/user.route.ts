import { Router } from 'express';
import { check } from 'express-validator';

/** Helpers */
import { existEmail, existUserById, existUserByStatus } from '../helpers/userHelper';

/** Middlewares */
import { validateJWT } from '../middlewares/jwtValidator';
import { validateFields } from '../middlewares/fieldValidator';

/** Controller methods */
import { getUsers, getUser, createUser, editUser, deleteUser } from '../controllers/user.controller';


const router = Router();

/** 
 * Get all users 
*/
router.get('/', getUsers);

/** 
 * Get user by id 
*/
router.get('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    check('id').custom(existUserByStatus),
    validateFields,
], getUser);

/**
 * Create User
 */
router.post('/', [
  check('name', 'Name is required').notEmpty(),
  check('password', 'Password is required and must be greater than 6 characters').isLength({ min:6 }),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(existEmail),
  validateFields  
], createUser);

/**
 * Edit user 
*/
router.put('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    check('email', 'Email is not valid').isEmail(),
    validateFields,
], editUser);

/** 
 * Delete user 
*/
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
], deleteUser);

export default router; 