import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createUserDto } from './dto/create-user.dto';
import { IUser } from './interface/users.interface';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @GrpcMethod('UserServices', 'Create')
  createUser(data: createUserDto,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>,
  ): IUser {
    return this.usersService.createUser(data, metaData, call);
  }
  @GrpcMethod('UserServices', 'GetUserbyId')
  getUserById(user: {id:string})  {
    return this.usersService.getUserById(user.id);
  }

  @GrpcMethod('UserServices', 'GetUsers')
  getAllUser()  {
    const res = {data: this.usersService.getUser()};
    
    console.log('56555555', res)
    return res;
  }
  @GrpcMethod('UserServices', 'DeleteUser')
  deleteUser(user: { id: string}) {
    return this.usersService.deleteUser(user.id);
  }
}
