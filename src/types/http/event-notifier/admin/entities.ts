import { AdminNotificationTemplate } from "../../notification-template"
import { BaseEventNotifier } from "../common"

/**
 * Admin event notifier entity.
 * Extends the base event notifier with admin-specific fields.
 */
export interface AdminEventNotifier extends BaseEventNotifier {
    template: AdminNotificationTemplate
 }
