import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameIsAdminColumn1659562635219 implements MigrationInterface {
  name = "RenameIsAdminColumn1659562635219";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "isAdmin" TO "is_admin"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "is_admin" TO "isAdmin"`
    );
  }
}
