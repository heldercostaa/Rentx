import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTokenTable1659666990852 implements MigrationInterface {
  name = "CreateUserTokenTable1659666990852";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_token" ("id" character varying NOT NULL, "refresh_token" character varying NOT NULL, "user_id" character varying NOT NULL, "expireDate" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_token" ADD CONSTRAINT "FK_79ac751931054ef450a2ee47778" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_token" DROP CONSTRAINT "FK_79ac751931054ef450a2ee47778"`
    );
    await queryRunner.query(`DROP TABLE "user_token"`);
  }
}
