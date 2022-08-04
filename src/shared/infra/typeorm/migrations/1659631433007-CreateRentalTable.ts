import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRentalTable1659631433007 implements MigrationInterface {
  name = "CreateRentalTable1659631433007";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_image" DROP CONSTRAINT "FK_0200bc874183c1427906dd64e3b"`
    );
    await queryRunner.query(
      `CREATE TABLE "rental" ("id" character varying NOT NULL, "car_id" character varying NOT NULL, "user_id" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "end_date" TIMESTAMP, "expected_return_date" TIMESTAMP NOT NULL, "total" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a20fc571eb61d5a30d8c16d51e8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "car_image" DROP COLUMN "carId"`);
    await queryRunner.query(
      `ALTER TABLE "car_image" ADD CONSTRAINT "FK_2d2bb7b50ec40713d9086e07419" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rental" ADD CONSTRAINT "FK_825ac8ad1401d7aa2ee7910a7fc" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rental" ADD CONSTRAINT "FK_dabeeabbf4e4f026cfae3b3d554" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental" DROP CONSTRAINT "FK_dabeeabbf4e4f026cfae3b3d554"`
    );
    await queryRunner.query(
      `ALTER TABLE "rental" DROP CONSTRAINT "FK_825ac8ad1401d7aa2ee7910a7fc"`
    );
    await queryRunner.query(
      `ALTER TABLE "car_image" DROP CONSTRAINT "FK_2d2bb7b50ec40713d9086e07419"`
    );
    await queryRunner.query(
      `ALTER TABLE "car_image" ADD "carId" character varying`
    );
    await queryRunner.query(`DROP TABLE "rental"`);
    await queryRunner.query(
      `ALTER TABLE "car_image" ADD CONSTRAINT "FK_0200bc874183c1427906dd64e3b" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
