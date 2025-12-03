import { DeleteResponse, PaginatedResponse } from "@medusajs/framework/types"
import { AdminEventNotifier } from "./entities"

/**
 * Response for retrieving a single event notifier.
 */
export interface AdminEventNotifierResponse {
    /**
     * The event notifier's details.
     */
    event_notifier: AdminEventNotifier
}

/**
 * Response for listing event notifiers with pagination.
 */
export type AdminEventNotifierListResponse = PaginatedResponse<{
    /**
     * The list of event notifiers.
     */
    event_notifiers: AdminEventNotifier[]
}>

/**
 * Response for deleting an event notifier.
 */
export interface AdminEventNotifierDeleteResponse
    extends DeleteResponse<"event_notifier"> { }
