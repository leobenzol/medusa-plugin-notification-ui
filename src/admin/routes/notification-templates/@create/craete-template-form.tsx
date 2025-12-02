import {
  Heading,
  RadioGroup,
  Text,
} from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { Form } from "../../../medusa/components/common/form"
import { FormReturn } from "./create-notification-template-form"
import { sdk } from "../../../medusa/lib/client"
import { useComboboxData } from "../../../medusa/hooks/use-combobox-data"
import { AdminNotificationTemplateListResponse } from "../../../../types/http/notification-template"
import { Combobox } from "../../../medusa/components/inputs/combobox"
import { SwitchBox } from "../../../medusa/components/common/switch-box"
import { useWatch } from "react-hook-form"
import { DEFAULT_TEMPLATES } from "../../../data"

export const CreateTemplateForm = ({ form }: { form: FormReturn }) => {
  const { t } = useTranslation("notification-ui")

  const layouts = useComboboxData({
    queryKey: ["notification_templates"],
    queryFn: (params) => sdk.client.fetch<AdminNotificationTemplateListResponse>("/admin/notification-templates", { query: { ...params, type: "layout" } }),
    getOptions: (data) =>
      data.notification_templates.map((template) => ({
        label: template.name,
        value: template.id,
      })),
  })

  const isLayout = useWatch({
    control: form.control,
    name: "is_layout",
  })

  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto">
      <div className="flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16">
        <div>
          <Heading className="capitalize">
            {t("notificationTemplates.create.title")}
          </Heading>
          <Text size="small" className="text-ui-fg-subtle">
            {t("notificationTemplates.create.hint")}
          </Text>
        </div>
        <div className="flex flex-col gap-y-4">
          <SwitchBox
            control={form.control}
            name="is_layout"
            onCheckedChange={checked => {
              if (checked)
                form.setValue("layout_id", undefined)
            }}
            label={t("notificationTemplates.create.isLayoutTemplate")}
            description={t("notificationTemplates.create.isLayoutTemplateDescription")}
          />
          {!isLayout && <Form.Field
            control={form.control}
            name="layout_id"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("fields.layout")}</Form.Label>
                  <Form.Control>
                    <Combobox
                      {...field}
                      options={layouts.options}
                      onChange={(e) => field.onChange(e ?? "")}
                      searchValue={layouts.searchValue}
                      onSearchValueChange={layouts.onSearchValueChange}
                      fetchNextPage={layouts.fetchNextPage}
                      placeholder={t("notificationTemplates.no_layout")}
                      allowClear
                    />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )
            }}
          />}
          <Form.Field
            control={form.control}
            name="template_code"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("fields.template_code")}</Form.Label>
                  <Form.Control>
                    <RadioGroup
                      className="grid-cols-2"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      {
                        Object.entries(DEFAULT_TEMPLATES).map(([key, template]) => (
                          <RadioGroup.ChoiceBox
                            key={key}
                            value={template.template_code}
                            label={t(`notificationTemplates.defaultTemplates.${key as keyof typeof DEFAULT_TEMPLATES}.title`)}
                            description={t(`notificationTemplates.defaultTemplates.${key as keyof typeof DEFAULT_TEMPLATES}.description`)}
                            className="overflow-hidden"
                          />
                        ))
                      }
                    </RadioGroup>
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
