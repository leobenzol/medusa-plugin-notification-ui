import { Module } from "@medusajs/framework/utils"
import NotificationTemplateService from "./service"

export const NOTIFICATION_TEMPLATE_MODULE = "notification_template"

export default Module(NOTIFICATION_TEMPLATE_MODULE, {
  service: NotificationTemplateService
})

declare module "@medusajs/framework/types" {
    interface ModuleImplementations {
        [NOTIFICATION_TEMPLATE_MODULE]: NotificationTemplateService
    }
}
