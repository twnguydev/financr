import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnumsForEntities1727769297642 implements MigrationInterface {
    name = 'AddEnumsForEntities1727769297642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP CONSTRAINT "FK_f25606fadfa8c90eba2607822ec"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "FK_2eed07a51efdd8ea99d442bcf2c"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP CONSTRAINT "PK_da8c6efd67bb301e810e56ac139"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "subscriptionType"`);
        await queryRunner.query(`CREATE TYPE "public"."tenant_subscriptiontype_enum" AS ENUM('starter', 'premium', 'enterprise')`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "subscriptionType" "public"."tenant_subscriptiontype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP CONSTRAINT "FK_e187133697fe44073a1c2498627"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP CONSTRAINT "PK_36def0c70162a40b8201d97ff11"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD CONSTRAINT "PK_36def0c70162a40b8201d97ff11" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD "tenantId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "platformRole"`);
        await queryRunner.query(`CREATE TYPE "public"."user_platformrole_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "platformRole" "public"."user_platformrole_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "billing" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "billing" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "billing" ADD "tenantId" uuid`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD CONSTRAINT "FK_e187133697fe44073a1c2498627" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD CONSTRAINT "FK_f25606fadfa8c90eba2607822ec" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "FK_2eed07a51efdd8ea99d442bcf2c" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "FK_2eed07a51efdd8ea99d442bcf2c"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP CONSTRAINT "FK_f25606fadfa8c90eba2607822ec"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP CONSTRAINT "FK_e187133697fe44073a1c2498627"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "billing" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "billing" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" json`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "platformRole"`);
        await queryRunner.query(`DROP TYPE "public"."user_platformrole_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "platformRole" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP CONSTRAINT "PK_36def0c70162a40b8201d97ff11"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD CONSTRAINT "PK_36def0c70162a40b8201d97ff11" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD CONSTRAINT "FK_e187133697fe44073a1c2498627" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "subscriptionType"`);
        await queryRunner.query(`DROP TYPE "public"."tenant_subscriptiontype_enum"`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "subscriptionType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP CONSTRAINT "PK_da8c6efd67bb301e810e56ac139"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "FK_2eed07a51efdd8ea99d442bcf2c" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_role" ADD CONSTRAINT "FK_f25606fadfa8c90eba2607822ec" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
