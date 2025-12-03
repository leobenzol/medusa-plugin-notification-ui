import { OperatorMap } from "@medusajs/framework/types"
import { FindParams } from "@medusajs/framework/types"

/**
 * Base event notifier entity with core fields.
 * This is extended by admin and other contexts.
 */
export interface BaseEventNotifier {
    /**
     * The event notifier's ID.
     */
    id: string

    /**
     * The event name this notifier listens to.
     */
    event_name: string

    /**
     * The ID of the notification template to use.
     */
    template_id: string

    /**
     * The notification channel (e.g., email, sms).
     */
    channel: string

    /**
     * The recipient type (static or entity_key).
     */
    recipient_type: "static" | "entity_key"

    /**
     * The recipient value (email address or entity key path).
     */
    recipient: string

    /**
     * The date the event notifier was created.
     */
    created_at: string

    /**
     * The date the event notifier was updated.
     */
    updated_at: string

    /**
     * The date the event notifier was deleted.
     */
    deleted_at?: string | null
}

/**
 * Base parameters for listing event notifiers.
 */
export interface BaseEventNotifierListParams extends FindParams {
    /**
     * Query or keywords to search the searchable fields.
     */
    q?: string

    /**
     * Filter by event notifier ID(s).
     */
    id?: string | string[]

    /**
     * Filter by event name(s).
     */
    event_name?: string | string[]

    /**
     * Filter by template ID(s).
     */
    template_id?: string | string[]

    /**
     * Filter by channel(s).
     */
    channel?: string | string[]

    /**
     * Apply filters on the event notifier's creation date.
     */
    created_at?: OperatorMap<string>

    /**
     * Apply filters on the event notifier's update date.
     */
    updated_at?: OperatorMap<string>
}
