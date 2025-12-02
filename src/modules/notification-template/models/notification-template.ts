import { model } from "@medusajs/framework/utils"

const NotificationTemplate = model.define("notification_template", {
  id: model.id().primaryKey(),

  name: model.text().searchable(),
  handle: model.text().unique(),
  description: model.text().searchable().nullable(),

  type: model.enum(["template", "layout"]),
  layout: model.belongsTo(() => NotificationTemplate).nullable(),

  template_code: model.text(),
})

export default NotificationTemplate
