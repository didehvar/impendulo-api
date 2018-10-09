import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStravaSubscriptions1539111106052
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "strava_subscriptions" ("id" SERIAL NOT NULL, "stravaId" integer NOT NULL, "applicationId" integer NOT NULL, "callbackUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_72d994d2c96eb62c8ad1e1ca1b0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "strava_subscriptions"`);
  }
}
