import { DataTableEmptyStateProps } from "@medusajs/ui"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

export const useEventNotifierTableEmptyState = (): DataTableEmptyStateProps => {
    const { t } = useTranslation("notification-ui")

    return useMemo(() => {
        const content: DataTableEmptyStateProps = {
            empty: {
                heading: t("eventNotifiers.emptyState.heading"),
                description: t("eventNotifiers.emptyState.description"),
            },
            filtered: {
                heading: t("eventNotifiers.emptyState.heading"),
                description: t("eventNotifiers.emptyState.description"),
            },
        }

        return content
    }, [t])
}
