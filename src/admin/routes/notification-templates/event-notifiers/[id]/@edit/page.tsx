import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteDrawer } from "../../../../../medusa/components/modals"
import { useEventNotifier } from "../../../../../hooks/use-event-notifiers"
import { EditEventNotifierForm } from "./edit-event-notifier-form"

const EventNotifierEdit = () => {
    const { id } = useParams()
    const { t } = useTranslation("notification-ui")

    const {
        event_notifier,
        isPending: isLoading,
        isError,
        error,
    } = useEventNotifier(id!)

    if (isError) {
        throw error
    }

    return (
        <RouteDrawer>
            <RouteDrawer.Header>
                <Heading className="capitalize">
                    {t("eventNotifiers.edit.title")}
                </Heading>
            </RouteDrawer.Header>
            {!isLoading && !!event_notifier && (
                <EditEventNotifierForm eventNotifier={event_notifier} />
            )}
        </RouteDrawer>
    )
}

export default EventNotifierEdit
