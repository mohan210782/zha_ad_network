/***
 * 
 * This is used to set the decorator for the user role based authentication
 */
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);   //set the user role passd from each end points