import { DataTableEmptyStateProps } from "@medusajs/ui"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

export const useNotificationTemplateTableEmptyState = (): DataTableEmptyStateProps => {
  const { t } = useTranslation("notification-ui")

  return useMemo(() => {
    const content: DataTableEmptyStateProps = {
      empty: {
        heading: t("notificationTemplates.list.empty.heading"),
        description: t("notificationTemplates.list.empty.description"),
      },
      filtered: {
        heading: t("notificationTemplates.list.filtered.heading"),
        description: t("notificationTemplates.list.filtered.description"),
      },
    }

    return content
  }, [t])
}
