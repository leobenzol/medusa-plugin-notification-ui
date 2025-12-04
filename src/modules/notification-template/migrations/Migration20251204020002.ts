import { Migration } from '@mikro-orm/migrations';

export class Migration20251204020002 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "notification_template" alter column "template_code" type jsonb using ("template_code"::jsonb);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "notification_template" alter column "template_code" type text using ("template_code"::text);`);
  }

}
