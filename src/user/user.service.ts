import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findByStravaId(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        stravaId: id,
      },
    });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
