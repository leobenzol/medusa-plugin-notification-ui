import { OperatorMap } from "@medusajs/framework/types"
import { FindParams } from "@medusajs/framework/types"

/**
 * The notification template's type.
 */
export type NotificationTemplateType = "template" | "layout"

/**
 * Base notification template entity with core fields.
 * This is extended by admin and other contexts.
 */
export interface BaseNotificationTemplate {
    /**
     * The notification template's ID.
     */
    id: string

    /**
     * The notification template's name.
     */
    name: string

    /**
     * The notification template's unique handle.
     */
    handle: string

    /**
     * The notification template's description.
     */
    description: string | null

    /**
     * The notification template's type (template or layout).
     */
    type: NotificationTemplateType

    /**
     * The ID of the layout that this template uses (if applicable).
     */
    layout_id: string | null

    /**
     * The layout that this template uses.
     */
    layout?: BaseNotificationTemplate | null

    /**
     * The notification template's code/content.
     */
    template_code: string

    /**
     * The date the notification template was created.
     */
    created_at: string

    /**
     * The date the notification template was updated.
     */
    updated_at: string

    /**
     * The date the notification template was deleted.
     */
    deleted_at?: string | null
}

/**
 * Base parameters for listing notification templates.
 */
export interface BaseNotificationTemplateListParams extends FindParams {
    /**
     * Query or keywords to search the searchable fields.
     */
    q?: string

    /**
     * Filter by notification template ID(s).
     */
    id?: string | string[]

    /**
     * Filter by notification template name(s).
     */
    name?: string | string[]

    /**
     * Filter by notification template handle(s).
     */
    handle?: string | string[]

    /**
     * Filter by notification template type(s).
     */
    type?: NotificationTemplateType | NotificationTemplateType[]

    /**
     * Filter by layout ID(s).
     */
    layout_id?: string | string[]

    /**
     * Apply filters on the notification template's creation date.
     */
    created_at?: OperatorMap<string>

    /**
     * Apply filters on the notification template's update date.
     */
    updated_at?: OperatorMap<string>
}
