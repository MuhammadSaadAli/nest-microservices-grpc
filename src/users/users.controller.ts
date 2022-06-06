import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(data: createUserDto) {
    console.log('CreateUser');

    const user = await this.usersService.createUser(data);
    console.log(user);
    return user;
  }

  @GrpcMethod('UserServices', 'Create')
  async createUser(
    data: createUserDto,
    metaData?: Metadata,
    call?: ServerUnaryCall<any, any>,
  ) {
    console.log('CreateUser');

    const user = await this.usersService.createUser(data);
    console.log(user);
    return user;
  }

  @GrpcMethod('UserServices', 'GetUsers')
  async getAllUser() {
    const res = await this.usersService.getUser();
    return { data: res };
  }

  @GrpcMethod('UserServices', 'DeleteUser')
  async deleteUser(id: any) {
    console.log('ID from controller: ', id.id);
    return this.usersService.deleteUser(id.id);
  }

  @GrpcMethod('UserServices', 'UpdateUser')
  async updateUser(param: any) {
    const res = this.usersService.updateUser(param.id, param.data);
    return { data: res };
  }
}
