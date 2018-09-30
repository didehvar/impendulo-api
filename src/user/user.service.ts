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

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      email,
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

  async getProfile(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id, {
      select: ['firstname', 'lastname'],
    });
  }
}
