import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkflowTable1771929913551 implements MigrationInterface {
    name = 'CreateWorkflowTable1771929913551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workflows" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "nodes" jsonb NOT NULL DEFAULT '[]', "edges" jsonb NOT NULL DEFAULT '[]', "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_5b5757cc1cd86268019fef52e0c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workflows"`);
    }

}
