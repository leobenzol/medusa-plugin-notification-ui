import { model } from "@medusajs/framework/utils"

const EventNotifier = model.define("event_notifier", {
  id: model.id().primaryKey(),
  event_name: model.text().unique(),
  template_id: model.text(),
  channel: model.text(),

  recipient_type: model.enum(["static", "entity_key"]),
  recipient: model.text(),
})

export default EventNotifier
