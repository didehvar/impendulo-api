import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByToken(token: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: {
        token,
      },
    });
  }

  async findByStravaId(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: {
        stravaId: id,
      },
    });
  }

  async create(user: DeepPartial<User>): Promise<User> {
    return await this.userRepository.create(user);
  }
}
