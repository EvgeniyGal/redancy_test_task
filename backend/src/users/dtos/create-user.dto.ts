import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';
import { UserRole } from '../user.entity';
import { isUnique } from 'src/shared/validation/is-unique';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsString()
  @IsEmail()
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
