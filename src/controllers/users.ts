import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { IGetUserByIdSchema } from '../validationSchemas/users';

class UserController {
  public static getAllUsers = async (req: Request, res: Response) => {
    res.send(req.db.get('users').value());
  }

  public static getUserById = async (req: ValidatedRequest<IGetUserByIdSchema>, res: Response) => {
    const { id } = req.params;
    const userRes = req.db.get('users').find({ id }).value();
    if (!userRes) {
      res.status(404).send();
    }
    res.send(userRes);
  }
}

export default UserController;
