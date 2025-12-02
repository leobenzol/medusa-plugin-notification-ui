import { BaseFilterable, OperatorMap } from "@medusajs/framework/types"
import { SelectParams } from "@medusajs/framework/types"
import { BaseNotificationTemplateListParams } from "../common"

/**
 * Query parameters for listing notification templates in admin.
 */
export interface AdminNotificationTemplateListParams
    extends BaseNotificationTemplateListParams,
        BaseFilterable<AdminNotificationTemplateListParams> {
    /**
     * Apply filters on the notification template's deletion date.
     */
    deleted_at?: OperatorMap<string>
}

/**
 * Query parameters for retrieving a single notification template in admin.
 */
export interface AdminNotificationTemplateParams extends SelectParams {}
