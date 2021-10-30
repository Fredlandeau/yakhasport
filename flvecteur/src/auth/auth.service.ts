import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('passe ' + username);
    const user = await this.userService.findOne(username);
    if (user && user.mdp === pass) {
      const { mdp, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAccount(user: any) {
    // l'utilisateur existe ?
    const userexist = await this.userService.findOne(user.username);
    const emailexist = await this.userService.findOneEmail(user.email);
    console.log(userexist);
    // créer l'utilisateur
    if (userexist) {
      throw new HttpException(`Ce nom d'utilisateur est déjà utilisé`, 401);
    }

    if (emailexist) {
      throw new HttpException(`Cet email est déjà utilisé`, 401);
    }

    const usercreated = await this.userService.createUser(user);
    return await this.login(usercreated);

    // logger l'utilisateur et donner token
  }
}
