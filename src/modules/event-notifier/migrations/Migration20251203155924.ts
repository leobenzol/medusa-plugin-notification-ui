import { Migration } from '@mikro-orm/migrations';

export class Migration20251203155924 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "event_notifier" drop constraint if exists "event_notifier_event_name_unique";`);
    this.addSql(`create table if not exists "event_notifier" ("id" text not null, "event_name" text not null, "template_id" text not null, "channel" text not null, "recipient_type" text check ("recipient_type" in ('static', 'entity_key')) not null, "recipient" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "event_notifier_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_event_notifier_event_name_unique" ON "event_notifier" ("event_name") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_event_notifier_deleted_at" ON "event_notifier" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "event_notifier" cascade;`);
  }

}
