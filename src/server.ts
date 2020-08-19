import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import { LowdbAsync } from 'lowdb';
import routes from './routes';
import { IUserEntity } from './models/user';

interface ISchema {
  users: IUserEntity[];
}
interface IUserJWT {
  userId: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    db: LowdbAsync<ISchema>;
    user?: IUserJWT;
  }
}

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  const adapter = new FileAsync('db.json');
  req.db = await low(adapter);
  await req.db.defaults({ users: [] })
    .write();
  next();
});

app.use('/', routes);

export default app;
