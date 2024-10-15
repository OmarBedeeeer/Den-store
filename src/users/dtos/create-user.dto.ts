import { IsString , IsNumber  , IsArray , IsEmail, IsMongoId , } from "class-validator";

export class CreateUserDto {
    @IsString()
    fullName: string

    @IsString()
    role: string
    
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    phoneNumber: string

    @IsNumber()
    age: number

    @IsArray()
    address: string

    
  @IsMongoId()
  cart: string;
}
