import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../modules/notification-template"
import {
    AdminCreateNotificationTemplate,
    AdminNotificationTemplate,
    AdminNotificationTemplateListParams,
    AdminNotificationTemplateListResponse,
    AdminNotificationTemplateParams,
    AdminNotificationTemplateResponse,
} from "../../../types"

export const GET = async (
    req: AuthenticatedMedusaRequest<AdminNotificationTemplateListParams>,
    res: MedusaResponse<AdminNotificationTemplateListResponse>
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const {
        data: notification_templates,
        metadata,
    } = await query.graph({
        entity: "notification_template",
        ...req.queryConfig,
        filters: req.filterableFields,
    })

    res.json({
        notification_templates: notification_templates as AdminNotificationTemplate[],
        count: metadata?.count || 0,
        limit: metadata?.take || 0,
        offset: metadata?.skip || 0,
    })
}

export const POST = async (
    req: AuthenticatedMedusaRequest<AdminCreateNotificationTemplate, AdminNotificationTemplateParams>,
    res: MedusaResponse<AdminNotificationTemplateResponse>
) => {
    const notificationTemplateService = req.scope.resolve(NOTIFICATION_TEMPLATE_MODULE)

    const { id } = await notificationTemplateService.createNotificationTemplates(
        req.validatedBody
    )

    const { data: [notification_template] } = await req.scope
        .resolve(ContainerRegistrationKeys.QUERY)
        .graph({
            entity: "notification_template",
            filters: { id },
            fields: req.queryConfig?.fields,
        })

    res.json({
        notification_template: notification_template as AdminNotificationTemplate
    })
}
