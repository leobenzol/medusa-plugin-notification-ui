import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { createDataTableColumnHelper, Tooltip } from "@medusajs/ui"
import { useDataTableDateColumns } from "../medusa/components/data-table/helpers/general/use-data-table-date-columns"
import { AdminNotificationTemplate } from "../../types/http/notification-template"

const columnHelper = createDataTableColumnHelper<AdminNotificationTemplate>()

export const useNotificationTemplateTableColumns = (isLayout: boolean) => {
  const { t } = useTranslation("notification-ui")
  const dateColumns = useDataTableDateColumns<AdminNotificationTemplate>()

  return useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => t("fields.name"),
        enableSorting: true,
        sortLabel: t("fields.name"),
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc"),
      }),
      ...(isLayout ? [] : [columnHelper.accessor("layout.name", {
        header: () => t("fields.layout"),
        enableSorting: true,
        sortLabel: t("fields.layout"),
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc"),
        cell: (info) => {
          const layoutName = info.getValue()
          return layoutName ? (
            <Tooltip content={layoutName}>
              <span className="block max-w-[150px] truncate">{layoutName}</span>
            </Tooltip>
          ) : (
            <span>-</span>
          )
        }
      })]),
      ...dateColumns,
    ],
    [t, dateColumns]
  )
}
