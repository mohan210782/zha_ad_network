
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import passport = require('passport');
import { JwtPayload } from './jwt-payload.interface';
import { jwtConstants } from './../common/constant';




  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
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
    //console.log("test123");
    let payloadNew = {id: req.id, email: req.email}
    //const user = await this.authService.validateUser(req);
    const user = await this.authService.validateUserToken(payloadNew);
    // if (!user) {
    //   //console.log("test123456");
    //   return done(new UnauthorizedException(), false);
    // }
    if(!user){
        throw new UnauthorizedException();
    }
    // if(req.body.refreshToken != (await user).refreshtoken){
    //     throw new UnauthorizedException();
    // }
    // if( new Date() > new Date((await user).refreshtokenexpires)){
    //   throw new UnauthorizedException();
    // }
    done(null, user);
  }
}