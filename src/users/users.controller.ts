import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createUserDto } from './dto/create-user.dto';
import {
  IAllUser,
  ICreateUser,
  Iid,
  IUpdateUser,
} from './interface/users.interface';
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
    // const res = { data: this.usersService.getUser() };
    const res = this.usersService.getUser();
    return res;
  }

  @GrpcMethod('UserServices', 'DeleteUser')
  // @Delete('/:id')
  deleteUser(id: any) {
    return this.usersService.deleteUser(id);
  }

  @GrpcMethod('UserServices', 'UpdateUser')
  updateUser(id: Iid, updateValue: IUpdateUser) {
    const res = { data: this.usersService.updateUser(id, updateValue) };
    console.log('res from controller : ', res);
    return res;
  }
}
