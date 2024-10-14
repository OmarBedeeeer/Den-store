import { IsString,IsNumber, IsNotEmpty } from "class-validator";
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    vendor: string; 
}