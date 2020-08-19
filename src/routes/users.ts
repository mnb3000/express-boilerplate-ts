import { Router } from 'express';
import UserController from '../controllers/users';
import { createValidator } from 'express-joi-validation';
import checkJwt from '../utils/checkJwt';
import { getUserByIdSchema } from '../validationSchemas/users';

const router = Router();
const validator = createValidator();

router.get('/', checkJwt, UserController.getAllUsers);
router.get('/:userId', checkJwt, validator.params(getUserByIdSchema), UserController.getUserById)

export default router;
