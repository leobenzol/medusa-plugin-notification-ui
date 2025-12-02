import { Migration } from '@mikro-orm/migrations';

export class Migration20251202121700 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "notification_template" drop constraint if exists "notification_template_handle_unique";`);
    this.addSql(`create table if not exists "notification_template" ("id" text not null, "name" text not null, "handle" text not null, "description" text null, "type" text check ("type" in ('template', 'layout')) not null, "layout_id" text null, "template_code" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "notification_template_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_notification_template_handle_unique" ON "notification_template" ("handle") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_notification_template_layout_id" ON "notification_template" ("layout_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_notification_template_deleted_at" ON "notification_template" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "notification_template" add constraint "notification_template_layout_id_foreign" foreign key ("layout_id") references "notification_template" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "notification_template" drop constraint if exists "notification_template_layout_id_foreign";`);

    this.addSql(`drop table if exists "notification_template" cascade;`);
  }

}
