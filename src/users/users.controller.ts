import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createUserDto } from './dto/create-user.dto';
import { IAllUser, ICreateUser } from './interface/users.interface';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @GrpcMethod('UserServices', 'Create')
  createUser(
    @Body() data: createUserDto,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>,
  ): ICreateUser {
    return this.usersService.createUser(data, metaData, call);
  }

  @GrpcMethod('UserServices', 'GetUsers')
  getAllUser() {
    return this.usersService.getUser();
  }
  @GrpcMethod('UserServices', 'DeleteUser')
  // @Delete('/:id')
  deleteUser(id: string) {
    return this.usersService.deleteUser(id);
  }
}
