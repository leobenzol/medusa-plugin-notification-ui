import { Module } from "@medusajs/framework/utils"
import EventNotifierService from "./service"
import eventSubscriberLoader from "./loaders/event-subscriber"

export const EVENT_NOTIFIER_MODULE = "event_notifier"

export default Module(EVENT_NOTIFIER_MODULE, {
  service: EventNotifierService,
  loaders: [eventSubscriberLoader],
})

declare module "@medusajs/framework/types" {
  interface ModuleImplementations {
    [EVENT_NOTIFIER_MODULE]: EventNotifierService
  }
}
