import { asValue } from "@medusajs/framework/awilix"
import {
    LoaderOptions,
    IEventBusModuleService,
    ModulesSdkTypes,
} from "@medusajs/framework/types"
import { Modules, ModulesSdkUtils } from "@medusajs/framework/utils"
import EventNotifier from "../models/event-notifier"

/**
 * Loader that subscribes to all events defined in the event notifiers
 * and emits a custom "event-notifier.emitter" event with the notifier id
 * and original event data
 */
export default async function eventSubscriberLoader({
    container,
}: LoaderOptions) {
    const logger = container.resolve("logger")
    // Resolve the generated internal service for EventNotifier data model
    const eventNotifierService = container.resolve("eventNotifierService") as ModulesSdkTypes.IMedusaInternalService<typeof EventNotifier>
    const [notifiers, count] = await eventNotifierService.listAndCount()

    if (!notifiers || count === 0) {
        logger.info("[EVENT-NOTIFIER] No event notifiers found to subscribe to")
        container.register("notifiers", asValue([]))
        return
    }
    container.register("notifiers", asValue(notifiers))
}
