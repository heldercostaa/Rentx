import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateRelationTableBetweenCarAndSpecification1659570837926
  implements MigrationInterface
{
  name = "GenerateRelationTableBetweenCarAndSpecification1659570837926";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car_specification" ("car_id" character varying NOT NULL, "specification_id" character varying NOT NULL, CONSTRAINT "PK_91cf28ec6f40c939ddb72c7b145" PRIMARY KEY ("car_id", "specification_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_344626b579487bbb1c72527a88" ON "car_specification" ("car_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7f69a2a5084f05dc5e8356c781" ON "car_specification" ("specification_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "car_specification" ADD CONSTRAINT "FK_344626b579487bbb1c72527a88d" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "car_specification" ADD CONSTRAINT "FK_7f69a2a5084f05dc5e8356c7814" FOREIGN KEY ("specification_id") REFERENCES "specification"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_specification" DROP CONSTRAINT "FK_7f69a2a5084f05dc5e8356c7814"`
    );
    await queryRunner.query(
      `ALTER TABLE "car_specification" DROP CONSTRAINT "FK_344626b579487bbb1c72527a88d"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7f69a2a5084f05dc5e8356c781"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_344626b579487bbb1c72527a88"`
    );
    await queryRunner.query(`DROP TABLE "car_specification"`);
  }
}
