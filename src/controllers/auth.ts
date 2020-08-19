import { Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { ValidatedRequest } from 'express-joi-validation';
import { ILoginSchema, ISignUpSchema } from '../validationSchemas/auth';
import { validate } from 'class-validator';

class AuthController {
  public static signUp = async (req: ValidatedRequest<ISignUpSchema>, res: Response) => {
    const user = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.phone,
      req.body.email,
      req.body.password,
      req.body.meta?.description,
    );
    user.hashPassword();
    const validationErrors = await validate(user);

    if (validationErrors.length) {
      res.status(401).send({ errors: validationErrors });
      return;
    }

    await req.db.get('users').push(user).write();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1h' },
    );

    res.send({ token });
  }

  public static login = async (req: ValidatedRequest<ILoginSchema>, res: Response) => {
    const { email, password } = req.body;
    const userData = req.db.get('users').find({ email }).value();
    if (!userData) {
      res.status(401).send();
      return;
    }
    const user = new User(
      userData.firstName,
      userData.lastName,
      userData.phone,
      userData.email,
      userData.password,
      userData.meta?.description,
    );
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1h' },
    );

    res.send({ token });
  }
}

export default AuthController;
