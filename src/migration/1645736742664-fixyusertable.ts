import {MigrationInterface, QueryRunner} from "typeorm";

export class fixyusertable1645736742664 implements MigrationInterface {
    name = 'fixyusertable1645736742664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "finished" boolean NOT NULL, CONSTRAINT "PK_34ecbce508fa8a98d0f23d9372a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buys_product_product" ("buysId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_23cbd9cf6087118d91663fd0270" PRIMARY KEY ("buysId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_618cdda761a44d9a687ae160a6" ON "buys_product_product" ("buysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f95b6d78cd0091c563d0bce8ed" ON "buys_product_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "buys" ADD CONSTRAINT "FK_6d690a7123e83d1fecb948e9ee3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buys_product_product" ADD CONSTRAINT "FK_618cdda761a44d9a687ae160a69" FOREIGN KEY ("buysId") REFERENCES "buys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buys_product_product" ADD CONSTRAINT "FK_f95b6d78cd0091c563d0bce8edc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buys_product_product" DROP CONSTRAINT "FK_f95b6d78cd0091c563d0bce8edc"`);
        await queryRunner.query(`ALTER TABLE "buys_product_product" DROP CONSTRAINT "FK_618cdda761a44d9a687ae160a69"`);
        await queryRunner.query(`ALTER TABLE "buys" DROP CONSTRAINT "FK_6d690a7123e83d1fecb948e9ee3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f95b6d78cd0091c563d0bce8ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_618cdda761a44d9a687ae160a6"`);
        await queryRunner.query(`DROP TABLE "buys_product_product"`);
        await queryRunner.query(`DROP TABLE "buys"`);
    }

}
