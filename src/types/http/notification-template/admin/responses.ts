import { DeleteResponse, PaginatedResponse, } from "@medusajs/framework/types"
import { AdminNotificationTemplate } from "./entities"

/**
 * Response for retrieving a single notification template.
 */
export interface AdminNotificationTemplateResponse {
    /**
     * The notification template's details.
     */
    notification_template: AdminNotificationTemplate
}

/**
 * Response for listing notification templates with pagination.
 */
export type AdminNotificationTemplateListResponse = PaginatedResponse<{
    /**
     * The list of notification templates.
     */
    notification_templates: AdminNotificationTemplate[]
}>

/**
 * Response for deleting a notification template.
 */
export interface AdminNotificationTemplateDeleteResponse
    extends DeleteResponse<"notification_template"> { }
