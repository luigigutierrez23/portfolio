import { Router } from 'express';
import { Login } from '../controllers/auth.controller';


const router = Router();

/**
 * Login 
 */
router.post('/login', Login);

export default router;