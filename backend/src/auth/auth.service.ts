import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.usersService.create(registerDto);

    // Return user without password
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }

  // TODO for candidates: Implement login method
  // This method should:
  // 1. Validate user credentials (email and password)
  // 2. Generate and return a JWT token
  // 3. Handle errors appropriately (user not found, wrong password)
  async login(loginDto: LoginDto) {
    throw new Error(
      'Login endpoint not implemented yet. TODO: Implement JWT authentication',
    );
  }

  // TODO for candidates: Implement token validation
  // This method should validate JWT tokens and return user information
  async validateUser(email: string, password: string): Promise<any> {
    throw new Error('User validation not implemented yet');
  }
}
