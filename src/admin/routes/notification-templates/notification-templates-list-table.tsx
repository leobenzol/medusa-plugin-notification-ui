import { PencilSquare, Trash } from "@medusajs/icons"
import {
  Container,
  createDataTableColumnHelper,
  Tabs,
  toast,
  usePrompt,
} from "@medusajs/ui"
import { keepPreviousData } from "@tanstack/react-query"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../medusa/components/data-table"
import { useDeleteNotificationTemplateLazy, useNotificationTemplates } from "../../hooks/use-notification-templates"
import { useNotificationTemplateTableFilters } from "../../hooks/use-notification-template-table-filters"
import { useNotificationTemplateTableEmptyState } from "../../hooks/use-notification-template-table-empty-state"
import { useNotificationTemplateTableColumns } from "../../hooks/use-notification-template-table-columns"
import { useNotificationTemplateTableQuery } from "../../hooks/use-notification-template-table-query"
import { AdminNotificationTemplate } from "../../../types/http/notification-template"

const PAGE_SIZE = 20

export const NotificationTemplatesListTable = () => {
  const { t } = useTranslation("notification-ui")
  const [activeTab, setActiveTab] = useState<"template" | "layout">("template")

  const searchParams = useNotificationTemplateTableQuery({
    pageSize: PAGE_SIZE,
  })

  const { notification_templates, count, isPending, isError, error } = useNotificationTemplates(
    { ...searchParams, type: activeTab },
    {
      placeholderData: keepPreviousData,
    }
  )

  const columns = useColumns(activeTab === "layout")
  const filters = useNotificationTemplateTableFilters()
  const emptyState = useNotificationTemplateTableEmptyState()

  if (isError) {
    throw error
  }

  return (
    <Container className="p-0">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "template" | "layout")}>
        <DataTable
          data={notification_templates}
          columns={columns}
          rowCount={count}
          getRowId={(row) => row.id}
          pageSize={PAGE_SIZE}
          filters={filters}
          isLoading={isPending}
          emptyState={emptyState}
          heading={
            <Tabs.List>
              <Tabs.Trigger value="template">{t("notificationTemplates.domain.templates")}</Tabs.Trigger>
              <Tabs.Trigger value="layout">{t("notificationTemplates.domain.layouts")}</Tabs.Trigger>
            </Tabs.List>
          }
          action={{
            label: t("actions.create"),
            to: "create",
          }}
          rowHref={(row) => `${row.id}`}
        />
      </Tabs>
    </Container>
  )
}

const columnHelper = createDataTableColumnHelper<
  AdminNotificationTemplate
>()

const useColumns = (isLayout: boolean) => {
  const { t } = useTranslation("notification-ui")
  const prompt = usePrompt()
  const navigate = useNavigate()
  const base = useNotificationTemplateTableColumns(isLayout)
  const { mutateAsync } = useDeleteNotificationTemplateLazy()

  const handleDelete = useCallback(
    async (notificationTemplate: AdminNotificationTemplate) => {
      const confirm = await prompt({
        title: t("general.areYouSure"),
        description: t("notificationTemplates.deleteWarning", {
          name: notificationTemplate.name,
        }),
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel"),
      })

      if (!confirm) {
        return
      }

      await mutateAsync(notificationTemplate.id, {
        onSuccess: () => {
          toast.success(t("notificationTemplates.toast.delete"))
        },
        onError: (e) => {
          toast.error(e.message)
        },
      })
    },
    [t, prompt, mutateAsync]
  )

  return useMemo(
    () => [
      ...base,
      columnHelper.action({
        actions: (ctx) => {
          // const disabledTooltip = ctx.row.original.is_default
          //   ? t("salesChannels.tooltip.cannotDeleteDefault")
          //   : undefined

          return [
            [
              {
                icon: <PencilSquare />,
                label: t("actions.edit"),
                onClick: () =>
                  navigate(
                    `${ctx.row.original.id}/edit`
                  ),
              },
            ],
            [
              {
                icon: <Trash />,
                label: t("actions.delete"),
                onClick: () => handleDelete(ctx.row.original),
                // disabled: ctx.row.original.is_default,
                // disabledTooltip,
              },
            ],
          ]
        },
      }),
    ],
    [base, handleDelete, navigate, t]
  )
}
