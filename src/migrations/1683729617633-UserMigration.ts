import { MigrationInterface, QueryRunner } from "typeorm"

export class UserMigration1683729617633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "users" (
          "id" SERIAL PRIMARY KEY,
          "username" VARCHAR(255) UNIQUE NOT NULL,
          "picture" VARCHAR(255) default NULL,
          "created_at" TIMESTAMP default NULL,
          "updated_at" TIMESTAMP default NULL
        )
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
