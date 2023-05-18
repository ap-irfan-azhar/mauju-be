import express from 'express';
import {
    getMeHandler,
    updateUser
} from '../controllers/user.controller';
import { registerUserHandler } from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {createUserSchema, updateUserSchema} from '../schemas/user.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);

// Update user by id
router.put('/',  validate(updateUserSchema), updateUser);


export default router;