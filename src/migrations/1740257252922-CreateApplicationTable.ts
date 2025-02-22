import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApplicationTable1740257252922 implements MigrationInterface {
    name = 'CreateApplicationTable1740257252922';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."applications_application_status_enum" AS ENUM(\'applied\', \'selected\', \'rejected\')');
        await queryRunner.query('CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job_id" character varying NOT NULL, "applicant_id" integer NOT NULL, "application_status" "public"."applications_application_status_enum" NOT NULL DEFAULT \'applied\', "applied_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "applications"');
        await queryRunner.query('DROP TYPE "public"."applications_application_status_enum"');
    }

}
