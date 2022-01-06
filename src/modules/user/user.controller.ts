
import { Controller, Post, Response, Body, HttpStatus, Inject, InternalServerErrorException, Get, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { Logger } from 'winston';
import * as path from 'path';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/interface/jwt-auth.guard';
import { RolesGuard } from '../auth/interface/role.guard';
import { Roles } from '../../common/decorators/role.decorator';



@ApiBearerAuth()
@ApiTags('User')
@Controller('User')

export class UserController {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly userService: UserService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
      ) {}
      
      
      @ApiOperation({ summary: 'Create User.' })
      @Post('/create/:accountTypeId')
      @UseGuards(JwtAuthGuard, RolesGuard)
      @Roles('admin', 'developer')
      public async register(@Param('accountTypeId') accountTypeId : string,  @Response() res, @Body() createUserDto: CreateUserDto, @Req() req) {
        try{
            //console.log("req--", req.user);

            //const result = await this.userService.create(accountTypeId, createUserDto, {'id': "dab21a2c-6455-43c9-8970-6470e36f1327"});
        	const result = await this.userService.create(accountTypeId, createUserDto, req.user);    
	        return res.status(HttpStatus.OK).json(result);

        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }

      //updates the new value to accounttype by ID
      @ApiOperation({ summary: "Update User" })
      @UseGuards(JwtAuthGuard, RolesGuard)
      @Roles('admin', 'developer',)
      @Put("/:id")
      async update(@Param("id") id: string, @Body() createUserDto: CreateUserDto, @Response() res, @Req() req): Promise<any> {
        try{
          const result = await this.userService.update(id, createUserDto, req.user);
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      } 


      //find all accounttypes from db and returns
      @ApiOperation({ summary: "List all Users" })
      @UseGuards(JwtAuthGuard, RolesGuard)
      @Roles('admin', 'developer',)
      //@ApiQuery({ name: 'firstName', type: [String] })
      @Get()
      async getAccTypes(@Response() res,  @Req() req): Promise<any> {
        try{
          console.log(req.user.accountType.accountType);
          const query = (req.user.accountType.accountType != 'admin') ? {createdBy : req.user.id} : {}
         
          const result = await this.userRepository.findAllUsers(query);
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
          console.log(err)
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }

      //find the accounttype by ID from db and returns
      @ApiOperation({ summary: "Get User by Id" })
      @UseGuards(JwtAuthGuard, RolesGuard)
      @Roles('admin', 'developer', 'customer')
      @Get("/:id")
      async findById(@Param("id") id: string, @Response() res): Promise<any> {
        try{
          const result = await this.userRepository.findOneUser(id);
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }

      //delete the accounttype by ID from db
      @ApiOperation({ summary: "Delete User by id" })
      @UseGuards(JwtAuthGuard, RolesGuard)
      @Roles('admin', 'developer',)
      @Delete("/:id")
      async delete(@Param("id") id: string, @Response() res): Promise<any> {
        try{
          const result = await this.userRepository.removeUser(id);
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }
      
}   
