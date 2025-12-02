import { defineMiddlewares } from "@medusajs/framework/http"
import { notificationTemplateMiddlewares } from "./admin/notification-templates/middlewares"

export default defineMiddlewares([
        ...notificationTemplateMiddlewares
    ]
)
