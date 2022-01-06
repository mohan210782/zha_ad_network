import { Controller, Post, Response, Body, HttpStatus, Inject, InternalServerErrorException, Get, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateUserWalletDto } from './dto/userWallet.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { Logger } from 'winston';
import * as path from 'path';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserWalletRepository } from './repository/userWallet.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/interface/jwt-auth.guard';
import { RolesGuard } from '../auth/interface/role.guard';
import { Roles } from '../../common/decorators/role.decorator';

@ApiBearerAuth()
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
    constructor(
        @InjectRepository(UserWalletRepository) private readonly userWalletRepository: UserWalletRepository,
        private readonly userWalletService: WalletService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
      ) {}

      //create wallet
      @ApiOperation({ summary: 'Create Wallet.' })
      @Post('/create/:userId')
      @UseGuards(JwtAuthGuard, RolesGuard)
      @Roles('admin', 'developer')
      public async register(@Param('UserId') userId : string,  @Response() res, @Body() createUserWalletDto: CreateUserWalletDto, @Req() req) {
        try{
            //console.log("req--", req.user);
            const result = await this.userWalletService.create(userId, createUserWalletDto, req.user);
            return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }

    //updates the new value to user-wallet by ID
    @ApiOperation({ summary: "Update User Wallet" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'developer')
    @Put("/:id")
    async update(@Param("id") id: string, @Body() createUserWalletDto: CreateUserWalletDto, @Response() res, @Req() req): Promise<any> {
      try{
        console.log("user===",req.user);
        const result = await this.userWalletService.update(id, createUserWalletDto, req.user);
        return res.status(HttpStatus.OK).json(result);
      }catch(err){
          this.logger.log("error",path.basename(__filename), err);
          throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
      }
    }

    //find all user wallets from db and returns
    @ApiOperation({ summary: "List all Users Wallet" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'developer')
    @Get()
    async getAllUserWallets(@Response() res, @Req() req): Promise<any> {
      try{
        const query = req.user.accountType.accountType == 'admin' ? {} : "createdBy='"+req.user.id+"'";
        const result = await this.userWalletRepository.findAllUserWallets(query);
        return res.status(HttpStatus.OK).json(result);
      }catch(err){
        console.log(err)
          this.logger.log("error",path.basename(__filename), err);
          throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
      }
    }

    //find the user wallet by ID from db and returns
    @ApiOperation({ summary: "Get User Wallet by WalletId" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin','developer')
    @Get("/user_balance:id")
    async findById(@Param("id") id: string, @Response() res): Promise<any> {
      try{
        const result = await this.userWalletRepository.findOneUserWallet(id);
        return res.status(HttpStatus.OK).json(result);
      }catch(err){
          this.logger.log("error",path.basename(__filename), err);
          throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
      }
    }

     //find the user wallet by ID from db and returns
     @ApiOperation({ summary: "Get Logged-in User Balance" })
     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles('admin', 'developer')
     @Get("/balance")
     async findCurrentUserBalance(@Response() res, @Req() req): Promise<any> {
       try{
         console.log(req.user)
         const result = await this.userWalletService.findOneUserWallet(req.user.id);
         return res.status(HttpStatus.OK).json(req.user.userWallet);
       }catch(err){
           this.logger.log("error",path.basename(__filename), err);
           throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
       }
     }

    //delete the user wallet by ID from db
    @ApiOperation({ summary: "Delete User Wallet by id" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'developer')
    @Delete("/:id")
    async delete(@Param("id") id: string, @Response() res): Promise<any> {
      try{
        const result = await this.userWalletRepository.removeUserWallet(id);
        return res.status(HttpStatus.OK).json(result);
      }catch(err){
          this.logger.log("error",path.basename(__filename), err);
          throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
      }
    }
}
