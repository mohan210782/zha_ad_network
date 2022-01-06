import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/auth.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './common/constant';
import { JwtPayload } from './interface/jwt-payload.interface';
import { CreateUserDto } from '../user/dto/user.dto';
var randtoken = require('rand-token');
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser( loginUserDto : LoginUserDto): Promise<any> {
      const user = await this.userService.findOneByEmail(loginUserDto.email)
        if(user ){
            return await user.comparePassword(loginUserDto.password)
            .then(async resultnew =>{
                if(resultnew == true){
                  const tt = await this.createToken(user);
                  return tt;
                }
            })
          }
         
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

      //function to generate the accesstoken and its expiry time for each user
    async createToken(user) {
        const expiresIn = 3600;
        let userId = user.id;
        const accessToken = await jwt.sign(
          {
            id: user.id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
          },
          jwtConstants.secret,
          { expiresIn },
        );
        const refreshToken = await this.generateRefreshToken(user.id)
        return {
          expiresIn,
          accessToken,
          refreshToken,
          userId
        };
      }

      async generateRefreshToken(userId):  Promise<string>{
        var refreshToken = randtoken.generate(16);
        var expirydate =new Date();
        expirydate.setDate(expirydate.getDate() + 1);
        let token = {
          refreshtoken: refreshToken,
          refreshtokenexpires: expirydate
        }
        await this.userService.saveOrUpdateRereshToken(userId, token);
        return refreshToken
      }

      //function to validate the user accesstoken
      async validateUserToken(payload: JwtPayload): Promise <any>{
            const user = await this.userService.findOneById(payload.id);
            if (!user)
            return null;
            return user;
        
      }

      //function to validate the user 2FA accesstoken
      async logout(user): Promise <any>{
        await this.generateRefreshToken(user.id)
        return true;
      }


}
