import { MigrationInterface, QueryRunner } from "typeorm";

export class V002_AddUserPicture_1736612513856 implements MigrationInterface {
	name = "V002_AddUserPicture_1736612513856";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "picture" character varying`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
	}
}
