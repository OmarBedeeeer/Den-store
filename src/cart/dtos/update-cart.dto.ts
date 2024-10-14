import { IsArray, IsOptional } from "class-validator";

export class UpdateCartDto {
    @IsOptional()
    user?: string;
  
    @IsOptional()
    @IsArray()
    products?: { product: string; quantity: number; price: number }[];

}