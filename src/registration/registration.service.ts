import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async addUser(
    username: string,
    picture: string,
  ) {
    try {
      const res = await this.userRepository.insert({
        username: username,
        picture: picture,
      });
      
      return res;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already in use');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
