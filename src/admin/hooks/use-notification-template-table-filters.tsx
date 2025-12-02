import { createDataTableFilterHelper } from "@medusajs/ui"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDataTableDateFilters } from "../medusa/components/data-table/helpers/general/use-data-table-date-filters"
import { AdminNotificationTemplate } from "../../types/http/notification-template"

const filterHelper = createDataTableFilterHelper<AdminNotificationTemplate>()

export const useNotificationTemplateTableFilters = () => {
  const { t } = useTranslation("notification-ui")
  const dateFilters = useDataTableDateFilters()

  return useMemo(
    () => [
      filterHelper.accessor("name", {
        label: t("fields.name"),
        type: "string",
      }),
      ...dateFilters,
    ],
    [dateFilters, t]
  )
}
