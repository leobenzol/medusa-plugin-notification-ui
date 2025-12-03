import { defineMiddlewares } from "@medusajs/framework/http"
import { notificationTemplateMiddlewares } from "./admin/notification-templates/middlewares"
import { eventNotifierMiddlewares } from "./admin/event-notifiers/middlewares"

export default defineMiddlewares([
    ...notificationTemplateMiddlewares,
    ...eventNotifierMiddlewares,
])
