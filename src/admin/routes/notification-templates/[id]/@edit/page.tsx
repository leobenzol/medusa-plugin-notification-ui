import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { RouteDrawer } from "../../../../medusa/components/modals"
import { useNotificationTemplate } from "../../../../hooks/use-notification-templates"
import { EditNotificationTemplateForm } from "./edit-notification-template-form"

const NotificationTemplateEdit = () => {
  const { id } = useParams()
  const { t } = useTranslation("notification-ui")

  const {
    notification_template,
    isPending: isLoading,
    isError,
    error,
  } = useNotificationTemplate(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading className="capitalize">
          {t("notificationTemplates.edit.title")}
        </Heading>
      </RouteDrawer.Header>
      {!isLoading && !!notification_template && (
        <EditNotificationTemplateForm notificationTemplate={notification_template} />
      )}
    </RouteDrawer>
  )
}

export default NotificationTemplateEdit
