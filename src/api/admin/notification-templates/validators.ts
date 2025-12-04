import { z } from "zod"
import { applyAndAndOrOperators } from "@medusajs/medusa/api/utils/common-validators/common"
import {
    createFindParams,
    createOperatorMap,
    createSelectParams,
} from "@medusajs/medusa/api/utils/validators"

export const AdminGetNotificationTemplateParams = createSelectParams()

const AdminGetNotificationTemplatesParamsDirectFields = z.object({
    q: z.string().optional(),
    id: z.union([z.string(), z.array(z.string())]).optional(),
    name: z.union([z.string(), z.array(z.string())]).optional(),
    handle: z.union([z.string(), z.array(z.string())]).optional(),
    type: z.union([z.enum(["template", "layout"]), z.array(z.enum(["template", "layout"]))]).optional(),
    layout_id: z.union([z.string(), z.array(z.string())]).optional(),
    created_at: createOperatorMap().optional(),
    updated_at: createOperatorMap().optional(),
    deleted_at: createOperatorMap().optional(),
})

export const AdminGetNotificationTemplatesParams = createFindParams({
    limit: 20,
    offset: 0,
})
    .merge(AdminGetNotificationTemplatesParamsDirectFields)
    .merge(applyAndAndOrOperators(AdminGetNotificationTemplatesParamsDirectFields))

export const AdminCreateNotificationTemplate = z.object({
    name: z.string().min(1, "Name is required"),
    handle: z
        .string()
        .min(1, "Handle is required")
        .regex(/^[a-z0-9-]+$/, "Handle must be lowercase alphanumeric with hyphens"),
    description: z.string().nullish(),
    type: z.enum(["template", "layout"]),
    layout_id: z.string().nullish(),
    template_code: z.object({
        jsx: z.string().optional(),
        additional: z.string().optional(),
        preview_props: z.string().optional(),
        i18n: z.string().optional(),
    })
})

export const AdminUpdateNotificationTemplate = z.object({
    name: z.string().min(1).optional(),
    handle: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, "Handle must be lowercase alphanumeric with hyphens")
        .optional(),
    description: z.string().nullish(),
    type: z.enum(["template", "layout"]).optional(),
    layout_id: z.string().nullish(),
    template_code: z.object({
        jsx: z.string().optional(),
        additional: z.string().optional(),
        preview_props: z.string().optional(),
        i18n: z.string().optional(),
    }).optional(),
})
