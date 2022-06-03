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

  @GrpcMethod('UserServices', 'Create')
  createUser(
    data: createUserDto,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>,
  ): ICreateUser {
    return this.usersService.createUser(data, metaData, call);
  }

  @GrpcMethod('UserServices', 'GetUsers')
  getAllUser() {
    const res = { data: this.usersService.getUser() };
    return res;
  }

  @GrpcMethod('UserServices', 'DeleteUser')
  // @Delete('/:id')
  deleteUser(id: any) {
    return this.usersService.deleteUser(id);
  }

  @GrpcMethod('UserServices', 'UpdateUser')
  updateUser(id: Iid, updateValue: IUpdateUser) {
    return this.usersService.updateUser(id, updateValue);
  }
}
