import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOneByToken(token: string): Promise<Users> {
    return await this.userRepository.findOneOrFail({
      where: {
        token,
      },
    });
  }

  async findByStravaId(id: number): Promise<Users | undefined> {
    return await this.userRepository.findOne({
      where: {
        stravaId: id,
      },
    });
  }

  async create(user: Users): Promise<Users> {
    return await this.userRepository.save(user);
  }
}
