import { defineRouteConfig } from "@medusajs/admin-sdk"
import { EventNotifiersTable } from "./event-notifiers-table.tsx"
import { SingleColumnPage } from "../../../medusa/components/layout/pages/index.ts"

const EventNotifiersList = () => {
    return (
        <SingleColumnPage
            widgets={{ before: [], after: [] }}
            hasOutlet
        >
            <EventNotifiersTable />
        </SingleColumnPage>
    )
}

export const config = defineRouteConfig({
    label: "eventNotifiers.title",
    translationNs: "notification-ui",
})

export default EventNotifiersList
