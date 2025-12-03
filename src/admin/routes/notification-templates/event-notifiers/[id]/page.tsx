import { Outlet, useParams } from "react-router-dom"
import { useEventNotifier } from "../../../../hooks/use-event-notifiers"
import { SingleColumnPageSkeleton } from "../../../../medusa/components/common/skeleton"
import { GeneralSection } from "./general-section"
import { JsonViewSection } from "../../../../medusa/components/common/json-view-section"

const EventNotifierDetail = () => {
    const { id } = useParams()
    const { event_notifier, isPending: isLoading } = useEventNotifier(id!)

    if (isLoading || !event_notifier) {
        return <SingleColumnPageSkeleton sections={1} showJSON />
    }

    return (
        <div className="flex w-full flex-col gap-y-3">
            <GeneralSection eventNotifier={event_notifier} />
            <JsonViewSection data={event_notifier} />
            <Outlet />
        </div>
    )
}

export default EventNotifierDetail
