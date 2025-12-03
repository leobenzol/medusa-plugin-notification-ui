import {
    MiddlewareRoute,
    validateAndTransformBody,
    validateAndTransformQuery,
} from "@medusajs/framework/http"
import * as QueryConfig from "./query-config"
import {
    AdminCreateEventNotifier,
    AdminGetEventNotifierParams,
    AdminGetEventNotifiersParams,
    AdminUpdateEventNotifier,
} from "./validators"

export const eventNotifierMiddlewares: MiddlewareRoute[] = [
    {
        method: ["GET"],
        matcher: "/admin/event-notifiers",
        middlewares: [
            validateAndTransformQuery(
                AdminGetEventNotifiersParams,
                QueryConfig.listTransformQueryConfig
            ),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/event-notifiers/:id",
        middlewares: [
            validateAndTransformQuery(
                AdminGetEventNotifierParams,
                QueryConfig.retrieveTransformQueryConfig
            ),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/event-notifiers",
        middlewares: [
            validateAndTransformBody(AdminCreateEventNotifier),
            validateAndTransformQuery(
                AdminGetEventNotifierParams,
                QueryConfig.retrieveTransformQueryConfig
            ),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/event-notifiers/:id",
        middlewares: [
            validateAndTransformBody(AdminUpdateEventNotifier),
            validateAndTransformQuery(
                AdminGetEventNotifierParams,
                QueryConfig.retrieveTransformQueryConfig
            ),
        ],
    },
]
