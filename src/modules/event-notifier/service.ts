import { MedusaService, Module, Modules } from "@medusajs/framework/utils"
import EventNotifier from "./models/event-notifier"
import { IEventBusModuleService, Logger } from "@medusajs/framework/types"
import { AdminEventNotifier } from "../../types"

type InjectedDependencies = {
  logger: any
  notifiers: AdminEventNotifier[]
  [Modules.EVENT_BUS]: IEventBusModuleService
}

class EventNotifierService extends MedusaService({
  EventNotifier
}) {
  constructor({ logger, notifiers, [Modules.EVENT_BUS]: eventBusService }: InjectedDependencies) {
    super(...arguments)
    try {
      logger.info(`[EVENT-NOTIFIER] Subscribing to ${notifiers.length} event notifier(s)`)

      for (const notifier of notifiers) {
        logger.debug(`[EVENT-NOTIFIER] Subscribing to event: ${notifier.event_name}`)
        createSubscriptions({
          notifier,
          eventBusService,
          eventNotifierService: this,
          logger,
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

/**
 * Creates event subscriptions for a notifier, including update and delete handlers
 */
export function createSubscriptions({
  notifier,
  eventBusService,
  eventNotifierService,
  logger,
  eventName: initialEventName,
}: {
  notifier: Pick<AdminEventNotifier, "id" | "event_name">
  eventBusService: IEventBusModuleService
  eventNotifierService: EventNotifierService
  logger: Logger
  eventName?: string
}) {
  const eventName = initialEventName || notifier.event_name

  const subscriber = async (data) => {
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
  }

  const updateSubscriber = async ({ data: { id } }: any) => {
    if (id === notifier.id) {
      const updatedNotifier = await eventNotifierService.retrieveEventNotifier(id)

      // If event name changed, clean up old subscriptions and create new ones
      if (eventName !== updatedNotifier.event_name) {
        logger.info(`[EVENT-NOTIFIER] Notifier updated: ${notifier.id}, event name changed from ${eventName} to ${updatedNotifier.event_name}`)

        // Clean up all old subscriptions
        eventBusService.unsubscribe(eventName, subscriber)
        eventBusService.unsubscribe("event_notifier.event-notifier.deleted", deleteSubscriber)
        eventBusService.unsubscribe("event_notifier.event-notifier.updated", updateSubscriber)

        // Create new subscriptions with updated event name
        createSubscriptions({
          notifier,
          eventName: updatedNotifier.event_name,
          eventBusService,
          eventNotifierService,
          logger,
        })
      }
    }
  }

  const deleteSubscriber = async ({ data: { id } }: any) => {
    if (id === notifier.id) {
      logger.info(`[EVENT-NOTIFIER] Unsubscribing from deleted event notifier: ${notifier.id} for event: ${eventName}`)

      // Clean up all subscriptions
      eventBusService.unsubscribe(eventName, subscriber)
      eventBusService.unsubscribe("event_notifier.event-notifier.deleted", deleteSubscriber)
      eventBusService.unsubscribe("event_notifier.event-notifier.updated", updateSubscriber)
    }
  }

  // Subscribe to all events
  eventBusService.subscribe(eventName, subscriber)
  eventBusService.subscribe("event_notifier.event-notifier.deleted", deleteSubscriber)
  eventBusService.subscribe("event_notifier.event-notifier.updated", updateSubscriber)
}
