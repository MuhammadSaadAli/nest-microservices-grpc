import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import {
  IAllUser,
  ICreateUser,
  Iid,
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
    this.allUsers.push(user);
    return user;
  }

  getUser() {
    return this.allUsers;
  }

  deleteUser(id: Iid) {
    const newUser = this.allUsers.filter((user) => id.id != user.id);
    console.log('newUser ', newUser, id);
    this.allUsers = newUser;
    return;
  }

  updateUser(id: Iid, updateValue: IUpdateUser) {
    let updatedUser = this.allUsers.findIndex((user) => user.id === id.id);
    if (updateValue.email.length == -1 && updateValue.password.length == -1) {
      return;
    }
    if (updateValue.email.length != -1) {
      this.allUsers[updatedUser].email = updateValue.email;
    }
    if (updateValue.password.length != -1) {
      this.allUsers[updatedUser].password = updateValue.password;
    }
  }
}
