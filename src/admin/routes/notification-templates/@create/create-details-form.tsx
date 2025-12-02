import {
  Heading,
  Input,
  Text,
  Textarea,
} from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { Form } from "../../../medusa/components/common/form"
import { FormReturn } from "./create-notification-template-form"
import { HandleInput } from "../../../medusa/components/inputs/handle-input"
import { useWatch } from "react-hook-form"

export const CreateDetailsForm = ({ form }: { form: FormReturn }) => {
  const { t } = useTranslation("notification-ui")

  const name = useWatch({ control: form.control, name: "name" })
  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto">
      <div className="flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16">
        <div>
          <Heading className="capitalize">
            {t("create.title")}
          </Heading>
          <Text size="small" className="text-ui-fg-subtle">
            {t("create.hint")}
          </Text>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Field
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>{t("fields.name")}</Form.Label>
                    <Form.Control>
                      <Input {...field} />
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
                    <Form.Label
                      optional
                    >
                      {t("fields.handle")}
                    </Form.Label>
                    <Form.Control>
                      <HandleInput {...field} placeholder={name} />
                    </Form.Control>
                  </Form.Item>
                )
              }}
            />
          </div>
          <Form.Field
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("fields.description")}</Form.Label>
                  <Form.Control>
                    <Textarea {...field} />
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
