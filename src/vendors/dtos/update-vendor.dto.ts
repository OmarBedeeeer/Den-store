import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateVendorDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsArray()
  @IsOptional()
  readonly products?: string[];
}