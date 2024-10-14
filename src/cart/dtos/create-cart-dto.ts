import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  user: string; 

  @IsArray()
  products: { product: string; quantity: number; price: number }[]; 
}
