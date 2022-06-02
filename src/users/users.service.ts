import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import {
  IUser,
} from './interface/users.interface';

@Injectable()
export class UsersService {
  private allUsers: IUser[] = [];

  createUser(
    data: createUserDto,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>,
  ): IUser {
    const { floor, random } = Math;
    const { email, password } = data;
    const id = floor(random() * 999 + random() * 99 - random() * 9).toString();
    const user = { id, email, password };
    this.allUsers.push(user);
    return user;
  }

  getUser(): IUser[] {
    return this.allUsers;
  }

  getUserById(id: string): IUser {
    return this.allUsers.find(x=>x.id === id);
  }

  deleteUser(id: string) {
    const newUser = this.allUsers.filter((user) => id !== user.id);
    this.allUsers = newUser;
    return newUser;
  }

  updateUser(id: string, updateValue: IUser) {
    let updatedUser = this.allUsers.find((user) => user.id === id);
    if (updateValue.email.length != -1) {
      return;
    }
  }
}
