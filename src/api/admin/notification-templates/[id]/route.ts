import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../../modules/notification-template"
import {
    AdminNotificationTemplateResponse,
    AdminNotificationTemplateDeleteResponse,
    AdminNotificationTemplateParams,
    AdminUpdateNotificationTemplate,
    AdminNotificationTemplate,
} from "../../../../types"

export const GET = async (
    req: AuthenticatedMedusaRequest<AdminNotificationTemplateParams>,
    res: MedusaResponse<AdminNotificationTemplateResponse>
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: [template] } = await query.graph({
        entity: "notification_template",
        ...req.queryConfig,
        filters: {
            id: req.params.id,
        },
    })

    if (!template) {
        return res.status(404).json({
            message: "Notification template not found",
        } as any)
    }

    res.json({
        notification_template: template as AdminNotificationTemplate,
    })
}

export const POST = async (
    req: AuthenticatedMedusaRequest<AdminUpdateNotificationTemplate, AdminNotificationTemplateParams>,
    res: MedusaResponse<AdminNotificationTemplateResponse>
) => {
    const notificationTemplateService = req.scope.resolve(NOTIFICATION_TEMPLATE_MODULE)

    await notificationTemplateService.updateNotificationTemplates({
        id: req.params.id,
        ...req.validatedBody,
    })

    const { data: [notification_template] } = await req.scope
        .resolve(ContainerRegistrationKeys.QUERY)
        .graph({
            entity: "notification_template",
            filters: { id: req.params.id },
            fields: req.queryConfig?.fields,
        })

    res.json({
        notification_template: notification_template as AdminNotificationTemplate,
    })
}

export const DELETE = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse<AdminNotificationTemplateDeleteResponse>
) => {
    const notificationTemplateService = req.scope.resolve(NOTIFICATION_TEMPLATE_MODULE)
    const notifierService = req.scope.resolve("event_notifier")

    const linkedNotifiers = await notifierService.listEventNotifiers({
        template_id: req.params.id,
    })

    if (linkedNotifiers.length > 0) 
        throw new MedusaError(MedusaError.Types.NOT_ALLOWED, "Cannot delete notification template linked to event notifiers")

    await notificationTemplateService.deleteNotificationTemplates(req.params.id)

    res.json({
        id: req.params.id,
        object: "notification_template",
        deleted: true,
    })
}
