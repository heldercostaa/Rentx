import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpecificationTable1659397259222
  implements MigrationInterface
{
  name = "CreateSpecificationTable1659397259222";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "specification" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_01b2d90197e187e3187b2d888be" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "specification"`);
  }
}
