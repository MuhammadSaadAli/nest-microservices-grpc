import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import {
  IAllUser,
  ICreateUser,
  IUpdateUser,
} from './interface/users.interface';

@Injectable()
export class UsersService {
  private allUsers: IAllUser[] = [];

  createUser(
    data: createUserDto,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>,
  ): ICreateUser {
    const { floor, random } = Math;
    const { email, password } = data;
    const id = floor(random() * 999 + random() * 99 - random() * 9).toString();
    const user = { id, email, password };
    console.log(user);
    this.allUsers.push(user);
    return user;
  }

  getUser() {
    return this.allUsers;
  }

  deleteUser(id: string) {
    const newUser = this.allUsers.filter((user) => id !== user.id);
    this.allUsers = newUser;
    return newUser;
  }

  updateUser(id: string, updateValue: IUpdateUser) {
    let updatedUser = this.allUsers.find((user) => user.id === id);
    if (updateValue.email.length != -1) {
      return;
    }
  }
}
