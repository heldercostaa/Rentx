import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarTable1659560799545 implements MigrationInterface {
  name = "CreateCarTable1659560799545";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "daily_rate" integer NOT NULL, "available" boolean NOT NULL DEFAULT true, "license_plate" character varying NOT NULL, "fine_amount" integer NOT NULL, "brand" character varying NOT NULL, "category_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_2f64ab33f185899f256d63f3483" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_2f64ab33f185899f256d63f3483"`
    );
    await queryRunner.query(`DROP TABLE "car"`);
  }
}
