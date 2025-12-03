import type { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa"

type EventData = { notifier_id: string, event_data: { id: string } }

export default async function eventNotifierEmittedHandler({
    event: { data: { notifier_id, event_data } },
    container,
}: SubscriberArgs<EventData>) {
    const query = container.resolve("query")
    const logger = container.resolve("logger")
    const notificationModule = container.resolve("notification")

    const notifier = await query.graph({
        entity: "event_notifier",
        filters: { id: notifier_id },
        fields: ["*", "template.*"],
    }).then(({ data }) => data[0])

    if (!notifier || !notifier.template) {
        logger.warn(`[EVENT-NOTIFIER] No notifier or template found for notifier ID: ${notifier_id}`)
        return
    }

    const eventName = notifier.event_name
    const entityName = eventName.split(".")[0]

    const entity = await query.graph({
        entity: entityName,
        filters: { id: event_data.id },
        fields: ["*"],
    }).then(({ data }) => data[0])

    await notificationModule.createNotifications({
        channel: notifier.channel,
        content: {
            //subject: template.name,
            html: notifier.template.template_code,
            //text: template.template_code,
        },
        to: notifier.recipient_type === "static"
            ? notifier.recipient
            : entity?.[notifier.recipient] || "",
    })


}

export const config: SubscriberConfig = {
    event: "event-notifier.emitter",
}
