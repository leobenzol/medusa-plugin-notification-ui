import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { createDataTableColumnHelper, Tooltip } from "@medusajs/ui"
import { useDataTableDateColumns } from "../medusa/components/data-table/helpers/general/use-data-table-date-columns"
import { AdminEventNotifier } from "../../types/http/event-notifier"

const columnHelper = createDataTableColumnHelper<AdminEventNotifier>()

export const useEventNotifierTableColumns = () => {
    const { t } = useTranslation("notification-ui")
    const dateColumns = useDataTableDateColumns<AdminEventNotifier>()

    return useMemo(
        () => [
            columnHelper.accessor("event_name", {
                header: () => t("eventNotifiers.table.eventName"),
                enableSorting: true,
                sortLabel: t("eventNotifiers.table.eventName"),
                sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
                sortDescLabel: t("filters.sorting.alphabeticallyDesc"),
            }),
            columnHelper.accessor("template.name", {
                header: () => t("eventNotifiers.table.template"),
                enableSorting: false,
                cell: (info) => {
                    const name = info.getValue()
                    return name ? (
                        <Tooltip content={name}>
                            <span className="block max-w-[150px] truncate">{name}</span>
                        </Tooltip>
                    ) : (
                        <span>-</span>
                    )
                }
            }),
            columnHelper.accessor("channel", {
                header: () => t("eventNotifiers.table.channel"),
                enableSorting: true,
                sortLabel: t("eventNotifiers.table.channel"),
                sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
                sortDescLabel: t("filters.sorting.alphabeticallyDesc"),
            }),
            columnHelper.accessor("recipient_type", {
                header: () => t("eventNotifiers.table.recipientType"),
                enableSorting: true,
                sortLabel: t("eventNotifiers.table.recipientType"),
            }),
            columnHelper.accessor("recipient", {
                header: () => t("eventNotifiers.table.recipient"),
                enableSorting: true,
                sortLabel: t("eventNotifiers.table.recipient"),
                cell: (info) => {
                    const recipient = info.getValue()
                    return recipient ? (
                        <Tooltip content={recipient}>
                            <span className="block max-w-[150px] truncate">{recipient}</span>
                        </Tooltip>
                    ) : (
                        <span>-</span>
                    )
                }
            }),
            ...dateColumns,
        ],
        [t, dateColumns]
    )
}
