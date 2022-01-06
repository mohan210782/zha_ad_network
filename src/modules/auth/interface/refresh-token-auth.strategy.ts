
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import passport = require('passport');
import { JwtPayload } from './jwt-payload.interface';
import { jwtConstants } from './../common/constant';




  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: jwtConstants.secret,
        ignoreExpiration: true,
      },
    );
  }

  public async validate(payload: JwtPayload, req: any, done: Function) {
    let payloadNew = {id: req.id, email: req.email}
    const user = await this.authService.validateUserToken(payloadNew);
    
    if(!user){
        throw new UnauthorizedException();
    }
    
    done(null, user);
  }
}