import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import {
  IAllUser,
  ICreateUser,
  Iid,
  IUpdateUser,
} from './interface/users.interface';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  private allUsers: IAllUser[] = [];

  async createUser(data: createUserDto) {
    // const { floor, random } = Math;
    // const { email, password } = data;
    // const id = floor(random() * 999 + random() * 99 - random() * 9).toString();
    // const user = { id, email, password };
    // this.allUsers.push(user);
    console.log('Create user service');
    console.log('User Data', data);

    const newUser = this.repo.create(data);
    console.log('newUser', newUser);
    // return data;
    return await this.repo.save(newUser);
  }

  async getUser() {
    // return this.allUsers;
    const query = await this.repo.createQueryBuilder();
    const users = await query.getMany();
    console.log(users);
    return users;
  }

  async deleteUser(id) {
    // const newUser = this.allUsers.filter((user) => id.id != user.id);
    // console.log('newUser ', newUser, id);
    // this.allUsers = newUser;
    const user = await this.repo.findOne(id);
    console.log(user);
    const result = this.repo.remove(user);
    console.log(result);
    return result;
  }

  updateUser(id: Iid, updateValue: IUpdateUser) {
    let updatedUser = this.allUsers.findIndex((user) => user.id === id.id);
    // if (updateValue.email.length == 0 && updateValue.password.length == 0) {
    //   return;
    // }
    if (updateValue.email.length != 0) {
      this.allUsers[updatedUser].email = updateValue.email;
    }
    if (updateValue.password.length != 0) {
      this.allUsers[updatedUser].password = updateValue.password;
    }
  }
}
