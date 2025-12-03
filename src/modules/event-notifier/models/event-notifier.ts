import { model } from "@medusajs/framework/utils"

const EventNotifier = model.define("event-notifier", {
  id: model.id().primaryKey(),
  event_name: model.text().unique(),
  template_id: model.text(),
  channel: model.text(),
})

export default EventNotifier
