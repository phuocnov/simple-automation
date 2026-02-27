import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNodeAndEdgeTable1772124011192 implements MigrationInterface {
  name = 'Migrations1772124011192';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "edges" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sourceId" uuid NOT NULL, "targetId" uuid NOT NULL, "workflowId" uuid, CONSTRAINT "PK_46bb3dd9779f5e6d0d2200cc1b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nodes" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" character varying NOT NULL, "data" jsonb NOT NULL, "position" jsonb NOT NULL, "workflowId" uuid, CONSTRAINT "PK_682d6427523a0fa43d062ea03ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workflows" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_5b5757cc1cd86268019fef52e0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "edges" ADD CONSTRAINT "FK_401845bdc58d6ace4ac52703c25" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "edges" ADD CONSTRAINT "FK_6107febbd4e78be53a736d07286" FOREIGN KEY ("sourceId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "edges" ADD CONSTRAINT "FK_7985ef3a56975613a773c3d9af5" FOREIGN KEY ("targetId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nodes" ADD CONSTRAINT "FK_523fa925607041ba8a399a5b158" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "nodes" DROP CONSTRAINT "FK_523fa925607041ba8a399a5b158"`,
    );
    await queryRunner.query(
      `ALTER TABLE "edges" DROP CONSTRAINT "FK_7985ef3a56975613a773c3d9af5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "edges" DROP CONSTRAINT "FK_6107febbd4e78be53a736d07286"`,
    );
    await queryRunner.query(
      `ALTER TABLE "edges" DROP CONSTRAINT "FK_401845bdc58d6ace4ac52703c25"`,
    );
    await queryRunner.query(`DROP TABLE "workflows"`);
    await queryRunner.query(`DROP TABLE "nodes"`);
    await queryRunner.query(`DROP TABLE "edges"`);
  }
}
