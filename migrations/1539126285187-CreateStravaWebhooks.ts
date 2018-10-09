import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStravaWebhooks1539126285187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "strava_webhooks_objecttype_enum" AS ENUM('activity', 'athlete')`,
    );
    await queryRunner.query(
      `CREATE TYPE "strava_webhooks_aspecttype_enum" AS ENUM('create', 'update', 'delete')`,
    );
    await queryRunner.query(
      `CREATE TABLE "strava_webhooks" ("id" SERIAL NOT NULL, "objectType" "strava_webhooks_objecttype_enum" NOT NULL, "objectId" integer NOT NULL, "aspectType" "strava_webhooks_aspecttype_enum" NOT NULL, "updates" json NOT NULL, "ownerId" integer NOT NULL, "subscriptionId" integer NOT NULL, "eventTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_94eb08dfb447135b5d6e99f6fa1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "strava_webhooks"`);
    await queryRunner.query(`DROP TYPE "strava_webhooks_aspecttype_enum"`);
    await queryRunner.query(`DROP TYPE "strava_webhooks_objecttype_enum"`);
  }
}
