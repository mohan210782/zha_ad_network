import {MigrationInterface, QueryRunner} from "typeorm";

export class myinit1641383800041 implements MigrationInterface {
    name = 'myinit1641383800041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300), "internalComment" character varying(300), "version" integer NOT NULL, "street" character varying(100) NOT NULL, "addressline1" character varying(100) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, "country" character varying(20) NOT NULL, "zip" character varying(20) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userwallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300), "internalComment" character varying(300), "version" integer NOT NULL, "walletUpperLimit" double precision, "walletLowerLimit" double precision, "walletCurrentAmount" double precision, CONSTRAINT "PK_48edcc6e7e3c9dc89c095b4babf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_gender_enum" AS ENUM('male', 'female', 'others')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300), "internalComment" character varying(300), "version" integer NOT NULL, "createdBy" character varying(300) NOT NULL, "firstName" character varying(20) NOT NULL, "lastName" character varying(20) NOT NULL, "gender" "users_gender_enum" NOT NULL, "email" character varying(30) NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "pin" integer, "refreshtoken" text, "refreshtokenexpires" TIMESTAMP WITH TIME ZONE, "commission" double precision, "addressId" uuid, "accountTypeId" uuid, "userWalletId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "REL_d29c53ee6224c8cabb62f9d1cb" UNIQUE ("userWalletId"), CONSTRAINT "CHK_ad31d98b65dbe512313af3c8d6" CHECK ("age" > 18), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "accounttype_accounttype_enum" AS ENUM('admin', 'developer', 'client', 'customer')`);
        await queryRunner.query(`CREATE TABLE "accounttype" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300), "internalComment" character varying(300), "version" integer NOT NULL, "accountType" "accounttype_accounttype_enum" NOT NULL DEFAULT 'customer', "description" character varying(300) NOT NULL, CONSTRAINT "UQ_6a39a154930cfec4d255ce3f6a1" UNIQUE ("accountType"), CONSTRAINT "PK_55634f609c700a64201b82ae897" PRIMARY KEY ("id"))`);
        await queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("accounttype")
        .values([
            {
              "id": "a53fa6ac-af52-458f-82bf-98d4a8f3e775",
              "isActive": true,
              "isArchived": false,
              "createDateTime": "2022-01-05T10:53:53.233Z",
              "lastChangedDateTime": "2022-01-05T10:53:53.233Z",
              "lastChangedBy": null,
              "internalComment": null,
              "version": 1,
              "accountType": "admin",
              "description": "admin user of the application"
            },
            {
              "id": "fcea276b-23f2-4467-b6fb-d7452545bc01",
              "isActive": true,
              "isArchived": false,
              "createDateTime": "2022-01-05T10:54:30.984Z",
              "lastChangedDateTime": "2022-01-05T10:54:30.984Z",
              "lastChangedBy": null,
              "internalComment": null,
              "version": 1,
              "accountType": "developer",
              "description": "developer user of the application"
            },
            {
              "id": "a368a8b1-19e2-4d33-8122-a6c9a91c52cc",
              "isActive": true,
              "isArchived": false,
              "createDateTime": "2022-01-05T10:54:45.851Z",
              "lastChangedDateTime": "2022-01-05T10:54:45.851Z",
              "lastChangedBy": null,
              "internalComment": null,
              "version": 1,
              "accountType": "client",
              "description": "client user of the application"
            },
            {
              "id": "519a1264-5fc7-4dc1-8430-33abf063ce71",
              "isActive": true,
              "isArchived": false,
              "createDateTime": "2022-01-05T10:55:00.763Z",
              "lastChangedDateTime": "2022-01-05T10:55:00.763Z",
              "lastChangedBy": null,
              "internalComment": null,
              "version": 1,
              "accountType": "customer",
              "description": "customer user of the application"
            }
          ])
        .execute()
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5e1a29e5ed3f2c167f87f2993ac" FOREIGN KEY ("accountTypeId") REFERENCES "accounttype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d29c53ee6224c8cabb62f9d1cb8" FOREIGN KEY ("userWalletId") REFERENCES "userwallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
        await queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("users")
        .values({
            "createdBy": "a368a8b1-19e2-4d33-8122-a6c9a91c52cc",
            "firstName": "admin",
            "lastName": "zha",
            "gender": "male",
            "email": "admin@email.com",
            "phone": "111-111-1111",
            "password": "$2b$10$0atY8kDzxWsbC1C.T8EpIOrQyNjzWVcvAXbRmjyF7uvsH3i/Qv2Ia",
            "age": 22,
            "commission": 5,
            "address": null,
            "accountType": "a53fa6ac-af52-458f-82bf-98d4a8f3e775",
            "userWallet": null,
            "lastChangedBy": null,
            "internalComment": null,
            "pin": null,
            "refreshtoken": null,
            "refreshtokenexpires": null,
            "id": "a926ed47-b35e-4fd1-ae98-5021d5e29857",
            "isActive": true,
            "isArchived": false,
            "createDateTime": "2022-01-05T11:53:29.934Z",
            "lastChangedDateTime": "2022-01-05T11:53:29.934Z",
            "version": 1
          })
        .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d29c53ee6224c8cabb62f9d1cb8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5e1a29e5ed3f2c167f87f2993ac"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`DROP TABLE "accounttype"`);
        await queryRunner.query(`DROP TYPE "accounttype_accounttype_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "userwallet"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
