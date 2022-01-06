import { Controller, UseGuards, Post, Request, Response, Body, HttpStatus, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './interface/jwt-auth.guard';
import { RefreshTokenGuard } from './interface/refresh-token-auth.gaurd';

@Controller('Auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        ) {}

    @Post('login')
    public async login(@Response() res, @Body() loginUserDto: LoginUserDto) {
      const result = await this.authService.validateUser(loginUserDto)
      if (!result) {
        return res.status(HttpStatus.BAD_REQUEST).json({"message" : "Login Failed"});
    }
    return res.status(HttpStatus.OK).json(result);
    
    }

    @UseGuards(RefreshTokenGuard)
    @ApiOperation({ summary: 'Get Refresh Token.' })
    @Post('/refreshtoken')
    async refreshToken(@Response() res, @Request() req){
      const result = await this.authService.createToken(req.user);
      if (!result) {
        return res.status(HttpStatus.BAD_REQUEST).json({"message": "Failed"});
    }
    return res.status(HttpStatus.OK).json(result);
      
    }

    @UseGuards(JwtAuthGuard)
    //@Roles('admin')
    @ApiOperation({ summary: 'Logout.' })
    @Get('/logout')
    public async LogoutUser( @Response() res, @Req() req) {
        const result = await this.authService.logout(req.user);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json({"res" : "logout Success"});
    
    
    }
}
