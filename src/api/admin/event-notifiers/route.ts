import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { EVENT_NOTIFIER_MODULE } from "../../../modules/event-notifier"
import {
    AdminCreateEventNotifier,
    AdminEventNotifier,
    AdminEventNotifierListParams,
    AdminEventNotifierListResponse,
    AdminEventNotifierParams,
    AdminEventNotifierResponse,
} from "../../../types"

export const GET = async (
    req: AuthenticatedMedusaRequest<AdminEventNotifierListParams>,
    res: MedusaResponse<AdminEventNotifierListResponse>
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const {
        data: event_notifiers,
        metadata,
    } = await query.graph({
        entity: "event_notifier",
        ...req.queryConfig,
        filters: req.filterableFields,
    })

    res.json({
        event_notifiers: event_notifiers as AdminEventNotifier[],
        count: metadata?.count || 0,
        limit: metadata?.take || 0,
        offset: metadata?.skip || 0,
    })
}

export const POST = async (
    req: AuthenticatedMedusaRequest<AdminCreateEventNotifier, AdminEventNotifierParams>,
    res: MedusaResponse<AdminEventNotifierResponse>
) => {
    const eventNotifierService = req.scope.resolve(EVENT_NOTIFIER_MODULE)

    const { id } = await eventNotifierService.createEventNotifiers(
        req.validatedBody
    )

    const { data: [event_notifier] } = await req.scope
        .resolve(ContainerRegistrationKeys.QUERY)
        .graph({
            entity: "event_notifier",
            filters: { id },
            fields: req.queryConfig?.fields,
        })

    res.json({
        event_notifier: event_notifier as AdminEventNotifier
    })
}
