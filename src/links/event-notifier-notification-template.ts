import { defineLink } from "@medusajs/framework/utils"
import EventNotifierModule from "../modules/event-notifier"
import NotificationTemplateModule from "../modules/notification-template"

/**
 * Read-only link between EventNotifier and NotificationTemplate
 * An event notifier is associated with one notification template.
 * The template_id field in EventNotifier stores the linked template's ID.
 */
export default defineLink(
    {
        linkable: EventNotifierModule.linkable.eventNotifier.id,
        field: "template_id",
    },
    {
        linkable: { 
            ...NotificationTemplateModule.linkable.notificationTemplate.id,
            alias: "template",
        }
    },
    {
        readOnly: true,
    }
)
