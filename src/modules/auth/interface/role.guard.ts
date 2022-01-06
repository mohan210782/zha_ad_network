/***
 * 
 * This file is for checking the Role based authentication
 */
import { Injectable, Inject, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { debug } from 'webpack';
//import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as path from 'path';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
     private reflector: Reflector
    ) {}

  canActivate(context: ExecutionContext): boolean {
    //get the role set in the controller file for a particular endpoint
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest(); //get the logged in request details
    const user = request.user;  //get the user logged in user details
    //console.log(user.accountType.accountType);
    if(roles.includes(user.accountType.accountType)){ //check if gthe module user role and user role assigned for the loggedin user
      return true;  //allow to access the module for the loggedin user
    }else{
      this.logger.log("error", "[" + path.basename(__filename)+ " Not to allow access the module for the loggedin user] - [" + user +"]");
      return false; //not to allow access the module for the loggedin user
    } 
  }
}