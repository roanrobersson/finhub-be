import { MigrationInterface, QueryRunner } from "typeorm";

export class V003_AddTablesTimestaps1737228692474
	implements MigrationInterface
{
	name = "V003_AddTablesTimestaps1737228692474";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "permission" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
		);
		await queryRunner.query(
			`ALTER TABLE "permission" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
		);
		await queryRunner.query(
			`ALTER TABLE "role" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
		);
		await queryRunner.query(
			`ALTER TABLE "role" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updatedAt"`);
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "updatedAt"`);
		await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "createdAt"`);
	}
}
