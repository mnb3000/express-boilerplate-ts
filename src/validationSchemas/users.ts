import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const getUserByIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export interface IGetUserByIdSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: Joi.extractType<typeof getUserByIdSchema>;
}
