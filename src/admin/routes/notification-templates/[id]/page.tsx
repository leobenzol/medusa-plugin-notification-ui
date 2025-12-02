import { Outlet, useParams } from "react-router-dom"
import { useNotificationTemplate } from "../../../hooks/use-notification-templates"
import { SingleColumnPageSkeleton } from "../../../medusa/components/common/skeleton"
import { GeneralSection } from "./general-section"
import { PreviewSection } from "./preview-section"
import { EditorSection } from "./editor-section"
import { useState } from "react"
import { JsonViewSection } from "../../../medusa/components/common/json-view-section"
import { AdminNotificationTemplate } from "../../../../types/http/notification-template"

const NotificationTemplateDetail = () => {
  const { id } = useParams()
  const { notification_template, isPending: isLoading } = useNotificationTemplate(id!)

  if (isLoading || !notification_template) {
    return <SingleColumnPageSkeleton sections={2} showJSON />
  }

  return (
    <div className="flex w-full flex-col gap-y-3">
      <GeneralSection notificationTemplate={notification_template} />
      <EditSection template={notification_template} />
      <JsonViewSection data={notification_template} />
      <Outlet />
    </div>
  )
}

const EditSection = ({ template }: { template: AdminNotificationTemplate }) => {
  const [editorCode, setEditorCode] = useState<string>(template.template_code)

  return (
    <div className="flex w-full flex-col items-start gap-x-4 gap-y-3 xl:grid xl:grid-cols-2">
      <div className="flex w-full min-w-0 flex-col gap-y-3">
        <EditorSection
          templateId={template.id}
          templateCode={template.template_code}
          onCodeChange={setEditorCode}
        />
      </div>
      <div className="flex w-full flex-col gap-y-3 xl:mt-0">
        <PreviewSection
          code={editorCode}
          layoutCode={template.layout?.template_code || ""}
          hasLayout={!!template.layout}
        />
      </div>
    </div>
  )
}

export default NotificationTemplateDetail
