import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'

import { AccounttypeModule } from './modules/accounttype/accounttype.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/decorators/http.exception.filter';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { CommissionModule } from './modules/commission/commission.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const options = new DocumentBuilder()
  .setTitle('Zha Ad Network')
  .setDescription('API for Zha Ad Network')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options, {
    include : [
      AuthModule,
      AccounttypeModule,
      UserModule,
      WalletModule,
      CommissionModule
    ]
  });
  SwaggerModule.setup('api', app, document);
  const reflector = app.get<Reflector>(Reflector);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.enableCors();
  await app.listen(port);	//this application listen for the port 3000
}
bootstrap();
