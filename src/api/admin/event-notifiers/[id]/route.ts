import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { EVENT_NOTIFIER_MODULE } from "../../../../modules/event-notifier"
import {
    AdminEventNotifierResponse,
    AdminEventNotifierDeleteResponse,
    AdminEventNotifierParams,
    AdminUpdateEventNotifier,
    AdminEventNotifier,
} from "../../../../types"

export const GET = async (
    req: AuthenticatedMedusaRequest<AdminEventNotifierParams>,
    res: MedusaResponse<AdminEventNotifierResponse>
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: [notifier] } = await query.graph({
        entity: "event_notifier",
        ...req.queryConfig,
        filters: {
            id: req.params.id,
        },
    })

    if (!notifier) {
        return res.status(404).json({
            message: "Event notifier not found",
        } as any)
    }

    res.json({
        event_notifier: notifier as AdminEventNotifier,
    })
}

export const POST = async (
    req: AuthenticatedMedusaRequest<AdminUpdateEventNotifier, AdminEventNotifierParams>,
    res: MedusaResponse<AdminEventNotifierResponse>
) => {
    const eventNotifierService = req.scope.resolve(EVENT_NOTIFIER_MODULE)

    await eventNotifierService.updateEventNotifiers({
        id: req.params.id,
        ...req.validatedBody,
    })

    const { data: [event_notifier] } = await req.scope
        .resolve(ContainerRegistrationKeys.QUERY)
        .graph({
            entity: "event_notifier",
            filters: { id: req.params.id },
            fields: req.queryConfig?.fields,
        })

    res.json({
        event_notifier: event_notifier as AdminEventNotifier,
    })
}

export const DELETE = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse<AdminEventNotifierDeleteResponse>
) => {
    const eventNotifierService = req.scope.resolve(EVENT_NOTIFIER_MODULE)

    await eventNotifierService.deleteEventNotifiers(req.params.id)

    res.json({
        id: req.params.id,
        object: "event_notifier",
        deleted: true,
    })
}
