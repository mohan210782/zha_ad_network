import { Controller, Post, Response, Body, HttpStatus, Inject, InternalServerErrorException, Get, Param, Put, Delete } from '@nestjs/common';
import { AccounttypeService } from './accounttype.service';
import { CreateAccountTypeDto } from './dto/accountType.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { AccountTypeRepository } from './repository/accountType.repository';

import { Logger } from 'winston';
import * as path from 'path';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectRepository } from '@nestjs/typeorm';

@ApiBearerAuth()
@ApiTags('AccountType')
@Controller('accounttype')

export class AccounttypeController {
    constructor(
        @InjectRepository(AccountTypeRepository) private readonly accountTypeRepository: AccountTypeRepository,
        private readonly accountTypeService: AccounttypeService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
      ) {}
      
      
      @ApiOperation({ summary: 'Create Account type.' })
      @Post('/create')
      public async register(@Response() res, @Body() createAccountTypeDto: CreateAccountTypeDto) {
        try{
            const result = await this.accountTypeService.create(createAccountTypeDto);
            return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }

      //updates the new value to accounttype by ID
      @ApiOperation({ summary: "Update account type" })
      @Put("/:id")
      async update(@Param("id") id: string, @Body() createAccountTypeDto: CreateAccountTypeDto, @Response() res): Promise<any> {
        try{
          const result = await this.accountTypeService.update(id, createAccountTypeDto);
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      } 


      //find all accounttypes from db and returns
      @ApiOperation({ summary: "List all account types" })
      @Get()
      async getAccTypes(@Response() res): Promise<any> {
        try{
          const result = await this.accountTypeRepository.findAllAccountType();
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
          console.log(err)
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }

      //find the accounttype by ID from db and returns
      @ApiOperation({ summary: "Get account type by Id" })
      @Get("/:id")
      async findById(@Param("id") id: string, @Response() res): Promise<any> {
        
        try{
          const result = await this.accountTypeRepository.findOneAccountType(id);
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }

      //delete the accounttype by ID from db
      @ApiOperation({ summary: "Delete account type by id" })
      @Delete("/:id")
      async delete(@Param("id") id: string, @Response() res): Promise<any> {
        try{
          const result = await this.accountTypeRepository.removeAccountType(id);
          return res.status(HttpStatus.OK).json(result);
        }catch(err){
            this.logger.log("error",path.basename(__filename), err);
            throw new InternalServerErrorException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: err});
        }
      }
      
}   
