import { IsString,IsNumber,IsNotEmpty,IsEmail,IsDate} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateStudentDTO {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateOfBirth!: Date;

  @IsNotEmpty()
  @IsNumber()
  grade!: number;
}