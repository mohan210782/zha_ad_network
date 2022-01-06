/***
 * 
 * This strategy file is for 2FA system
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import passport = require('passport');
import { JwtPayload } from './jwt-payload.interface';



@Injectable()
export class TfaStrategy extends PassportStrategy(Strategy, 'tfa') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.JWT_SECRET,
      },
    );
  }

  public async validate(payload: JwtPayload, req: any, done: Function) {
console.log("test1");
    // const user = await this.authService.validateUserToken2fa(req.email);
    // if (!user) {
    //   return done(new UnauthorizedException(), false);
    // }
    //done(null, user);
  }
}

