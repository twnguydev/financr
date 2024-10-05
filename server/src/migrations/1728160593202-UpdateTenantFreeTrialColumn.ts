import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTenantFreeTrialColumn1728160593202 implements MigrationInterface {
    name = 'UpdateTenantFreeTrialColumn1728160593202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant" ALTER COLUMN "freeTrialEndsAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant" ALTER COLUMN "freeTrialEndsAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant" ALTER COLUMN "freeTrialEndsAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tenant" ALTER COLUMN "freeTrialEndsAt" SET NOT NULL`);
    }

}
