import { BaseFilterable, OperatorMap } from "@medusajs/framework/types"
import { SelectParams } from "@medusajs/framework/types"
import { BaseEventNotifierListParams } from "../common"

/**
 * Query parameters for listing event notifiers in admin.
 */
export interface AdminEventNotifierListParams
    extends BaseEventNotifierListParams,
    BaseFilterable<AdminEventNotifierListParams> {
    /**
     * Apply filters on the event notifier's deletion date.
     */
    deleted_at?: OperatorMap<string>
}

/**
 * Query parameters for retrieving a single event notifier in admin.
 */
export interface AdminEventNotifierParams extends SelectParams { }
