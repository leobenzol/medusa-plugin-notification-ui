import type { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa"
import { EVENT_NOTIFIER_MODULE } from "../modules/event-notifier"
import { createSubscriptions } from "../modules/event-notifier/service"

type EventData = { id: string }

export default async function eventNotifierCreatedHandler({
    event: { data: { id } },
    container,
}: SubscriberArgs<EventData>) {
    const query = container.resolve("query")
    const logger = container.resolve("logger")
    const eventBusService = container.resolve("event_bus")
    const eventNotifierService = container.resolve(EVENT_NOTIFIER_MODULE)

    const notifier = await query.graph({
        entity: "event_notifier",
        filters: { id },
        fields: ["*"],
    }).then(({ data }) => data[0])


    if (!notifier) {
        logger.error(`[EVENT-NOTIFIER] No notifier found for created notifier ID: ${id}`)
        return
    }

    // Create subscriptions for the newly created notifier
    createSubscriptions({
        notifier,
        eventBusService,
        eventNotifierService,
        logger,
    })

    logger.info(`[EVENT-NOTIFIER] Notifier created for event ${notifier.event_name}`)
}

export const config: SubscriberConfig = {
    event: "event_notifier.event-notifier.created",
}
