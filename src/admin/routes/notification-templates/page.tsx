import { defineRouteConfig } from "@medusajs/admin-sdk"
import { NotificationTemplatesListTable } from "./notification-templates-list-table"
import { SingleColumnPage } from "../../medusa/components/layout/pages/index.ts"
import { BellAlert } from "@medusajs/icons"

const NotificationTemplatesList = () => {
  return (
    <SingleColumnPage
      widgets={{ before: [], after: [], }}
      hasOutlet
    >
      <NotificationTemplatesListTable />
    </SingleColumnPage>
  )
}

export const config = defineRouteConfig({
  label: "title",
  translationNs: "notification-ui",
  icon: BellAlert,
})

export default NotificationTemplatesList
