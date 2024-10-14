import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  readonly name: string;

  @IsArray()
  @IsOptional()
  readonly products: string[];
}