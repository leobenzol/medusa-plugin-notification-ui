import {
    MiddlewareRoute,
    validateAndTransformBody,
    validateAndTransformQuery,
} from "@medusajs/framework/http"
import * as QueryConfig from "./query-config"
import {
    AdminCreateNotificationTemplate,
    AdminGetNotificationTemplateParams,
    AdminGetNotificationTemplatesParams,
    AdminUpdateNotificationTemplate,
} from "./validators"

export const notificationTemplateMiddlewares: MiddlewareRoute[] = [
    {
        method: ["GET"],
        matcher: "/admin/notification-templates",
        middlewares: [
            validateAndTransformQuery(
                AdminGetNotificationTemplatesParams,
                QueryConfig.listTransformQueryConfig
            ),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/notification-templates/:id",
        middlewares: [
            validateAndTransformQuery(
                AdminGetNotificationTemplateParams,
                QueryConfig.retrieveTransformQueryConfig
            ),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/notification-templates",
        middlewares: [
            validateAndTransformBody(AdminCreateNotificationTemplate),
            validateAndTransformQuery(
                AdminGetNotificationTemplateParams,
                QueryConfig.retrieveTransformQueryConfig
            ),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/notification-templates/:id",
        middlewares: [
            validateAndTransformBody(AdminUpdateNotificationTemplate),
            validateAndTransformQuery(
                AdminGetNotificationTemplateParams,
                QueryConfig.retrieveTransformQueryConfig
            ),
        ],
    },
]
