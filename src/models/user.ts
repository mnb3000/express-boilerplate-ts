import {
  IsEmail, IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

interface IUserMeta {
  description?: string;
}

export default class User {
  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    description?: string,
  ) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.password = password;
    if (description) {
      this.meta = { description };
    }
  }

  @IsOptional()
  @IsUUID()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsPhoneNumber(null)
  public phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  @Length(8)
  public password: string;

  @IsOptional()
  @ValidateNested()
  public meta?: IUserMeta;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export interface IUserEntity {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  meta?: IUserMeta;
}
