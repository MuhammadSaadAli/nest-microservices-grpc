import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Body, Controller, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createUserDto } from './dto/create-user.dto';
import { IAllUser, ICreateUser } from './interface/users.interface';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @GrpcMethod('CreateUserServices', 'Create')
  @Post()
  createUser(
    @Body() data: createUserDto,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>,
  ): ICreateUser {
    return this.usersService.createUser(data, metaData, call);
  }
}
