import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(2)
  firstName: string;

  @IsOptional()
  @MinLength(2)
  lastName: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  token: string | null;

  @IsNotEmptyObject()
  this: UpdateUserDto;
}
