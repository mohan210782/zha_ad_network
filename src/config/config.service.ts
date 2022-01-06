// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
        type: 'postgres',

        host: this.getValue('POSTGRES_HOST'),
        port: parseInt(this.getValue('POSTGRES_PORT')),
        username: this.getValue('POSTGRES_USER'),
        password: this.getValue('POSTGRES_PASSWORD'),
        database: this.getValue('POSTGRES_DATABASE'),
        cache: {
            duration:  +this.getValue('CACHE_DURATION') // 30 seconds
        },
        logging: ['error', 'warn', 'log'],
        logger: "file",
        maxQueryExecutionTime: 1000,
        entities: [
            //'dist/modules/**/*.entity{.ts,.js}', 
            'src/**/*.entity{.ts,.js}', 
        ],
        migrations: [
            //"dist/migrations/**/*{.ts,.js}"
            "src/migrations/**/*{.ts,.js}"
        ],
        subscribers: [
            "src/subscriber/**/*.ts"
        ],
        cli: {
            entitiesDir: "src/entities",
            migrationsDir: 'src/migrations',
            subscribersDir: "src/subscriber"
        },
        synchronize: true, 
        migrationsRun: false,
        ssl: this.isProduction(),
    };
  }

}

function getMigrationDirectory() {
	const directory = process.env.NODE_ENV === 'DEV' ? 'src' : `${__dirname}`;
	return `${directory}/migrations/**/*{.ts,.js}`;
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
    'CACHE_DURATION'
  ]);

export { configService };
