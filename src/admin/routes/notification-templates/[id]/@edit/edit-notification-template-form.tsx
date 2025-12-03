import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Textarea, toast } from "@medusajs/ui"
import { useForm, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as zod from "zod"

import { Form } from "../../../../medusa/components/common/form"
import { RouteDrawer, useRouteModal } from "../../../../medusa/components/modals"
import { KeyboundForm } from "../../../../medusa/components/utilities/keybound-form"
import { AdminNotificationTemplateListResponse, AdminNotificationTemplate } from "../../../../../types/http/notification-template"
import { notificationTemplatesQueryKeys, useUpdateNotificationTemplate } from "../../../../hooks/use-notification-templates"
import { SwitchBox } from "../../../../medusa/components/common/switch-box"
import { Combobox } from "../../../../medusa/components/inputs/combobox"
import { useComboboxData } from "../../../../medusa/hooks/use-combobox-data"
import { sdk } from "../../../../medusa/lib/client"

type EditNotificationTemplateFormProps = {
  notificationTemplate: AdminNotificationTemplate
}

const EditNotificationTemplateSchema = zod.object({
  name: zod.string().min(1),
  handle: zod.string().min(1),
  description: zod.string().optional(),
  is_layout: zod.boolean().default(false),
  layout_id: zod.string().optional(),
})

export const EditNotificationTemplateForm = ({
  notificationTemplate,
}: EditNotificationTemplateFormProps) => {
  const { t } = useTranslation("notification-ui")
  const { handleSuccess } = useRouteModal()

  const form = useForm<zod.infer<typeof EditNotificationTemplateSchema>>({
    defaultValues: {
      name: notificationTemplate.name,
      handle: notificationTemplate.handle,
      description: notificationTemplate.description || undefined,
      is_layout: notificationTemplate.type === "layout",
      layout_id: notificationTemplate.layout_id || undefined,
    },
    resolver: zodResolver(EditNotificationTemplateSchema),
  })

  const { mutateAsync, isPending } = useUpdateNotificationTemplate(notificationTemplate.id)

  const handleSubmit = form.handleSubmit(async ({ is_layout, layout_id, ...values }) => {
    await mutateAsync({ ...values, type: is_layout ? "layout" : "template", layout_id: layout_id || null },
      {
        onSuccess: () => {
          toast.success(t("notificationTemplates.toast.update"))
          handleSuccess()
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  })

  const isLayout = useWatch({
    control: form.control,
    name: "is_layout",
  })

  const layouts = useComboboxData({
    queryKey: notificationTemplatesQueryKeys.list({ type: "layout" }),
    queryFn: (params) => sdk.client.fetch<AdminNotificationTemplateListResponse>("/admin/notification-templates", { query: { ...params, type: "layout" } }),
    getOptions: (data) =>
      data.notification_templates.map((template) => ({
        label: template.name,
        value: template.id,
      })),
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <RouteDrawer.Body className="flex max-w-full flex-1 flex-col gap-y-8 overflow-y-auto">
          <Form.Field
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("fields.name")}</Form.Label>
                  <Form.Control>
                    <Input {...field} size="small" />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="handle"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("fields.handle")}</Form.Label>
                  <Form.Control>
                    <Input {...field} size="small" />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label optional>{t("fields.description")}</Form.Label>
                  <Form.Control>
                    <Textarea {...field} />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )
            }}
          />
          <SwitchBox
            control={form.control}
            name="is_layout"
            onCheckedChange={checked => {
              if (checked)
                form.setValue("layout_id", undefined)
            }}
            label={t("notificationTemplates.edit.isLayoutTemplate")}
            description={t("notificationTemplates.edit.isLayoutTemplateDescription")}
          />
          {!isLayout && <Form.Field
            control={form.control}
            name="layout_id"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{t("fields.layout")}</Form.Label>
                <Form.Control>
                  <Combobox
                    {...field}
                    onChange={(e) => field.onChange(e ?? "")}
                    options={layouts.options}
                    searchValue={layouts.searchValue}
                    onSearchValueChange={layouts.onSearchValueChange}
                    fetchNextPage={layouts.fetchNextPage}
                    allowClear
                  />
                </Form.Control>
                <Form.ErrorMessage />
              </Form.Item>
            )}
          />}
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}
