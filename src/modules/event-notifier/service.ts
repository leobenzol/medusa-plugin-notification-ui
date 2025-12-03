import { MedusaService, Module, Modules } from "@medusajs/framework/utils"
import EventNotifier from "./models/event-notifier"

class EventNotifierService extends MedusaService({
  EventNotifier
}) {
  constructor({ logger, notifiers, [Modules.EVENT_BUS]: eventBusService }: any) {
    super(...arguments)
    try {
      logger.info(`[EVENT-NOTIFIER] Subscribing to ${notifiers.length} event notifier(s)`)

      for (const notifier of notifiers) {
        const eventName = notifier.event_name
        logger.debug(`[EVENT-NOTIFIER] Subscribing to event: ${eventName}`)

        // Subscribe to the event and emit our custom event
        eventBusService.subscribe(eventName, async (data) => {
          logger.debug(
            `[EVENT-NOTIFIER] Event ${eventName} triggered, emitting event-notifier.emitter with notifier ${notifier.id}`
          )

          // Emit our custom event with notifier id and original event data
          await eventBusService.emit({
            name: "event-notifier.emitter",
            data: {
              notifier_id: notifier.id,
              event_data: data.data,
            },
          })
        })
      }

      logger.info(`[EVENT-NOTIFIER] Successfully subscribed to all event notifiers`)
    } catch (error) {
      logger.error(
        `[EVENT-NOTIFIER] Error subscribing to event notifiers: ${error.message}`,
        error
      )
    }
  }
}

export default EventNotifierService
