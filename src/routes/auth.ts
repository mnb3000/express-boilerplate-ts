import { Router } from 'express';
import AuthController from '../controllers/auth';
import { createValidator } from 'express-joi-validation';
import { loginSchema, signUpSchema } from '../validationSchemas/auth';

const router = Router();
const validator = createValidator();

router.post('/signUp', validator.body(signUpSchema), AuthController.signUp);
router.post('/login', validator.body(loginSchema), AuthController.login);

export default router;
