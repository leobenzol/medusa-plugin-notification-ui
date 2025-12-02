import { BaseNotificationTemplate } from "../common"

/**
 * Admin notification template entity.
 * Extends the base notification template with admin-specific fields.
 */
export interface AdminNotificationTemplate extends BaseNotificationTemplate {
    /**
     * The layout that this template uses (if applicable).
     */
    layout?: AdminNotificationTemplate | null
}
