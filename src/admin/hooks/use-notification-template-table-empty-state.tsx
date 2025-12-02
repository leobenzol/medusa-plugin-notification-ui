import { DataTableEmptyStateProps } from "@medusajs/ui"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

export const useNotificationTemplateTableEmptyState = (): DataTableEmptyStateProps => {
  const { t } = useTranslation("notification-ui")

  return useMemo(() => {
    const content: DataTableEmptyStateProps = {
      empty: {
        heading: t("list.empty.heading"),
        description: t("list.empty.description"),
      },
      filtered: {
        heading: t("list.filtered.heading"),
        description: t("list.filtered.description"),
      },
    }

    return content
  }, [t])
}
