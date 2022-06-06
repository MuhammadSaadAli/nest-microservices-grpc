import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { IAllUser } from './interface/users.interface';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  private allUsers: IAllUser[] = [];

  async createUser(data: createUserDto) {
    const newUser = this.repo.create(data);
    console.log('newUser', newUser);
    return await this.repo.save(newUser);
  }

  async getUser() {
    const query = await this.repo.createQueryBuilder('User');
    const users = await query.getMany();
    console.log(users);
    return users;
  }

  async deleteUser(id) {
    console.log(id);
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User Not found ');
    }
    console.log(user);
    const result = this.repo.remove(user);
    console.log(result);
    return result;
  }

  async updateUser(id: any, data: User) {
    const user = await this.repo.findOne({ where: { id } });
    console.log('Updated User from the service ', user);
    console.log('Updated Value from the service ', data);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, data);
    await this.repo.save(user);
    return user;
  }
}
