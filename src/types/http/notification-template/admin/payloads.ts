import { NotificationTemplateType } from "../common"

/**
 * Request payload for creating a notification template.
 */
export interface AdminCreateNotificationTemplate {
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
    description?: string | null

    /**
     * The notification template's type (template or layout).
     */
    type: NotificationTemplateType

    /**
     * The ID of the layout that this template uses (if applicable).
     */
    layout_id?: string | null

    /**
     * The notification template's code/content.
     */
    template_code: string
}

/**
 * Request payload for updating a notification template.
 */
export interface AdminUpdateNotificationTemplate {
    /**
     * The notification template's name.
     */
    name?: string

    /**
     * The notification template's unique handle.
     */
    handle?: string

    /**
     * The notification template's description.
     */
    description?: string | null

    /**
     * The notification template's type (template or layout).
     */
    type?: NotificationTemplateType

    /**
     * The ID of the layout that this template uses (if applicable).
     */
    layout_id?: string | null

    /**
     * The notification template's code/content.
     */
    template_code?: string
}
