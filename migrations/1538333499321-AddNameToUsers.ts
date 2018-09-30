import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToUsers1538333499321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "users"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "firstname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "lastname" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
  }
}
