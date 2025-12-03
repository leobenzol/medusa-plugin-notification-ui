import { z } from "zod"
import { applyAndAndOrOperators } from "@medusajs/medusa/api/utils/common-validators/common"
import {
    createFindParams,
    createOperatorMap,
    createSelectParams,
} from "@medusajs/medusa/api/utils/validators"

export const AdminGetEventNotifierParams = createSelectParams()

const AdminGetEventNotifiersParamsDirectFields = z.object({
    q: z.string().optional(),
    id: z.union([z.string(), z.array(z.string())]).optional(),
    event_name: z.union([z.string(), z.array(z.string())]).optional(),
    template_id: z.union([z.string(), z.array(z.string())]).optional(),
    channel: z.union([z.string(), z.array(z.string())]).optional(),
    recipient_type: z.union([z.enum(["static", "entity_key"]), z.array(z.enum(["static", "entity_key"]))]).optional(),
    recipient: z.union([z.string(), z.array(z.string())]).optional(),
    created_at: createOperatorMap().optional(),
    updated_at: createOperatorMap().optional(),
    deleted_at: createOperatorMap().optional(),
})

export const AdminGetEventNotifiersParams = createFindParams({
    limit: 20,
    offset: 0,
})
    .merge(AdminGetEventNotifiersParamsDirectFields)
    .merge(applyAndAndOrOperators(AdminGetEventNotifiersParamsDirectFields))

export const AdminCreateEventNotifier = z.object({
    event_name: z.string().min(1, "Event name is required"),
    template_id: z.string().min(1, "Template ID is required"),
    channel: z.string().min(1, "Channel is required"),
    recipient_type: z.enum(["static", "entity_key"]),
    recipient: z.string().min(1, "Recipient is required"),
})

export const AdminUpdateEventNotifier = z.object({
    event_name: z.string().min(1).optional(),
    template_id: z.string().min(1).optional(),
    channel: z.string().min(1).optional(),
    recipient_type: z.enum(["static", "entity_key"]).optional(),
    recipient: z.string().min(1).optional(),
})
