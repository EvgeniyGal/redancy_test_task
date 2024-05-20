import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user.entity';
import { isUnique } from 'src/shared/validation/is-unique';

export class CreateUserDto {
  @MinLength(2)
  firstName: string;

  @MinLength(2)
  lastName: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsEmail()
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
