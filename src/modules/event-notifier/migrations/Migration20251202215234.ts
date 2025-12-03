import { Migration } from '@mikro-orm/migrations';

export class Migration20251202215234 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "event-notifier" drop constraint if exists "event-notifier_event_name_unique";`);
    this.addSql(`create table if not exists "event-notifier" ("id" text not null, "event_name" text not null, "template_id" text not null, "channel" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "event-notifier_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_event-notifier_event_name_unique" ON "event-notifier" ("event_name") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_event-notifier_deleted_at" ON "event-notifier" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "event-notifier" cascade;`);
  }

}
