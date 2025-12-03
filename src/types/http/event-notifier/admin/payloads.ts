/**
 * Request payload for creating an event notifier.
 */
export interface AdminCreateEventNotifier {
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
}

/**
 * Request payload for updating an event notifier.
 */
export interface AdminUpdateEventNotifier {
    /**
     * The event name this notifier listens to.
     */
    event_name?: string

    /**
     * The ID of the notification template to use.
     */
    template_id?: string

    /**
     * The notification channel (e.g., email, sms).
     */
    channel?: string

    /**
     * The recipient type (static or entity_key).
     */
    recipient_type?: "static" | "entity_key"

    /**
     * The recipient value (email address or entity key path).
     */
    recipient?: string
}
