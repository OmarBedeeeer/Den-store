import { 
    Controller,
    Get, Post, Body,
    Patch, Param,
    Delete, 
    HttpCode} 
    from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
    
  }
  @Post('login')
  @HttpCode(200)
  async logIn(@Body() LoginUserDto: LoginUserDto) {
    return this.userService.logIn(LoginUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}