import { Button, ProgressStatus, ProgressTabs, toast } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
import {
  RouteFocusModal,
  useRouteModal,
} from "../../../medusa/components/modals"
import { KeyboundForm } from "../../../medusa/components/utilities/keybound-form"
import { useDocumentDirection } from "../../../medusa/hooks/use-document-direction"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useCreateNotificationTemplate } from "../../../hooks/use-notification-templates"
import { CreateDetailsForm } from "./create-details-form"
import { CreateTemplateForm } from "./craete-template-form"
import { kebabCase } from "../../../medusa/components/utilities/kebab-case"
import { DEFAULT_TEMPLATES } from "../../../data"

enum Tab {
  DETAILS = "details",
  TEMPLATE = "template",
}

type TabState = Record<Tab, ProgressStatus>

const CreateNotificationTemplateSchema = zod.object({
  name: zod.string().nonempty(),
  handle: zod.string().optional(),
  description: zod.string().optional(),
  is_layout: zod.boolean().default(false),
  layout_id: zod.string().optional(),
  template_code: zod.string().nonempty(),
})

export type FormReturn = UseFormReturn<zod.infer<typeof CreateNotificationTemplateSchema>>

export const CreateNotificationTemplateForm = () => {
  const [tab, setTab] = useState<Tab>(Tab.DETAILS)
  const [tabState, setTabState] = useState<TabState>({
    [Tab.DETAILS]: "in-progress",
    [Tab.TEMPLATE]: "not-started",
  })

  const { t } = useTranslation("notification-ui")
  const { handleSuccess } = useRouteModal()
  const direction = useDocumentDirection()
  const form = useForm<zod.infer<typeof CreateNotificationTemplateSchema>>({
    defaultValues: {
      template_code: DEFAULT_TEMPLATES["blank"].template_code,
    },
    resolver: zodResolver(CreateNotificationTemplateSchema),
  })

  const { mutateAsync, isPending } = useCreateNotificationTemplate()

  const handleSubmit = form.handleSubmit(async ({ is_layout, layout_id, handle, ...values }) => {
    await mutateAsync({
      ...values,
      type: is_layout ? "layout" : "template",
      layout_id: layout_id || null,
      handle: handle || kebabCase(values.name),
    },
      {
        onSuccess: ({ notification_template }) => {
          toast.success(t("toast.create"))
          handleSuccess(`../${notification_template.id}`)
        },
        onError: (error) => toast.error(error.message),
      }
    )
  })

  const onNext = async (currentTab: Tab) => {
    const valid = await form.trigger()

    if (!valid) {
      return
    }

    if (currentTab === Tab.DETAILS) {
      setTab(Tab.TEMPLATE)
    }
  }

  useEffect(() => {
    const currentState = { ...tabState }
    if (tab === Tab.DETAILS) {
      currentState[Tab.DETAILS] = "in-progress"
    }
    if (tab === Tab.TEMPLATE) {
      currentState[Tab.DETAILS] = "completed"
      currentState[Tab.TEMPLATE] = "in-progress"
    }
    setTabState({ ...currentState })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want this effect to run when the tab changes
  }, [tab])

  return (
    <RouteFocusModal.Form form={form}>
      <KeyboundForm
        onKeyDown={(e) => {
          // We want to continue to the next tab on enter instead of saving as draft immediately
          if (e.key === "Enter") {
            if (
              e.target instanceof HTMLTextAreaElement &&
              !(e.metaKey || e.ctrlKey)
            ) {
              return
            }

            e.preventDefault()

            if (e.metaKey || e.ctrlKey) {
              if (tab !== Tab.TEMPLATE) {
                e.preventDefault()
                e.stopPropagation()
                onNext(tab)

                return
              }

              handleSubmit()
            }
          }
        }}
        onSubmit={handleSubmit}
        className="flex h-full flex-col"
      >
        <ProgressTabs
          dir={direction}
          value={tab}
          onValueChange={async (tab) => {
            const valid = await form.trigger()

            if (!valid) {
              return
            }

            setTab(tab as Tab)
          }}
          className="flex h-full flex-col overflow-hidden"
        >
          <RouteFocusModal.Header>
            <div className="-my-2 w-full border-l">
              <ProgressTabs.List className="justify-start-start flex w-full items-center">
                <ProgressTabs.Trigger
                  status={tabState[Tab.DETAILS]}
                  value={Tab.DETAILS}
                  className="max-w-[200px] truncate"
                >
                  {t("create.tabs.details")}
                </ProgressTabs.Trigger>
                <ProgressTabs.Trigger
                  status={tabState[Tab.TEMPLATE]}
                  value={Tab.TEMPLATE}
                  className="max-w-[200px] truncate"
                >
                  {t("create.tabs.template")}
                </ProgressTabs.Trigger>
              </ProgressTabs.List>
            </div>
          </RouteFocusModal.Header>
          <RouteFocusModal.Body className="size-full overflow-hidden">
            <ProgressTabs.Content
              className="size-full overflow-y-auto"
              value={Tab.DETAILS}
            >
              <CreateDetailsForm form={form} />
            </ProgressTabs.Content>
            <ProgressTabs.Content
              className="size-full overflow-y-auto"
              value={Tab.TEMPLATE}
            >
              <CreateTemplateForm form={form} />
            </ProgressTabs.Content>
          </RouteFocusModal.Body>
        </ProgressTabs>
        <RouteFocusModal.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteFocusModal.Close asChild>
              <Button variant="secondary" size="small">
                {t("actions.cancel")}
              </Button>
            </RouteFocusModal.Close>
            <PrimaryButton
              tab={tab}
              next={onNext}
              isLoading={isPending}
            />
          </div>
        </RouteFocusModal.Footer>
      </KeyboundForm>
    </RouteFocusModal.Form>
  )
}

type PrimaryButtonProps = {
  tab: Tab
  next: (tab: Tab) => void
  isLoading?: boolean
}

const PrimaryButton = ({
  tab,
  next,
  isLoading,
}: PrimaryButtonProps) => {
  const { t } = useTranslation("notification-ui")

  if (tab === Tab.TEMPLATE) {
    return (
      <Button
        data-name="publish-button"
        key="submit-button"
        type="submit"
        variant="primary"
        size="small"
        isLoading={isLoading}
      >
        {t("actions.publish")}
      </Button>
    )
  }

  return (
    <Button
      key="next-button"
      type="button"
      variant="primary"
      size="small"
      onClick={() => next(tab)}
    >
      {t("actions.continue")}
    </Button>
  )
}
