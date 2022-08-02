import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarColumnToUserTable1659465549257
  implements MigrationInterface
{
  name = "AddAvatarColumnToUserTable1659465549257";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
