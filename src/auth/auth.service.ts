import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { User, UserDocument } from './auth.schema';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // create new user service
  async createUser(userData: RegisterDto) {
    // check if user already exists
    const user = await this.userModel
      .findOne({ email: userData.email })
      .select('email');

    if (user) {
      throw new ConflictException('This email already exists', {
        description: 'email',
      });
    }

    // create new user
    userData.password = hashSync(userData.password, genSaltSync(10));
    await new this.userModel(userData).save();
    return { message: 'registered successfully' };
  }

  // login user service
  async loginUser(userData: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = userData;

    // check if user email and password are correct
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('This email not exists', {
        description: 'email',
      });
    }

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Wrong password', {
        description: 'password',
      });
    }

    // create jwt functionality
    return {
      access_token: this.jwtService.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }
}
