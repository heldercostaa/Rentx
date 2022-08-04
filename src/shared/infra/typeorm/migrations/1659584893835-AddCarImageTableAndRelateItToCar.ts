import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCarImageTableAndRelateItToCar1659584893835
  implements MigrationInterface
{
  name = "AddCarImageTableAndRelateItToCar1659584893835";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car_image" ("id" character varying NOT NULL, "car_id" character varying NOT NULL, "image_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "carId" character varying, CONSTRAINT "PK_76cf0a3401a80a59c62f3576bbc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "car_image" ADD CONSTRAINT "FK_0200bc874183c1427906dd64e3b" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_image" DROP CONSTRAINT "FK_0200bc874183c1427906dd64e3b"`
    );
    await queryRunner.query(`DROP TABLE "car_image"`);
  }
}
