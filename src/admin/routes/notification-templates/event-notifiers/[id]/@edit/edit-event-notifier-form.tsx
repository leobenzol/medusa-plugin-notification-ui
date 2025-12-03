import { Button, Input, Select, toast } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { RouteDrawer, useRouteModal } from "../../../../../medusa/components/modals"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useUpdateEventNotifier } from "../../../../../hooks/use-event-notifiers"
import { AdminEventNotifier } from "../../../../../../types/http/event-notifier"
import { Form } from "../../../../../medusa/components/common/form"
import { Combobox } from "../../../../../medusa/components/inputs/combobox"
import { useComboboxData } from "../../../../../medusa/hooks/use-combobox-data"
import { sdk } from "../../../../../medusa/lib/client"
import { AdminNotificationTemplateListResponse } from "../../../../../../types/http/notification-template"
import { useNotificationProviders } from "../../../../../hooks/use-notification-providers"
import { notificationTemplatesQueryKeys } from "../../../../../hooks/use-notification-templates"

const EditEventNotifierSchema = zod.object({
    event_name: zod.string().nonempty("Event name is required"),
    template_id: zod.string().nonempty("Template is required"),
    channel: zod.string().nonempty("Channel is required"),
    recipient_type: zod.enum(["static", "entity_key"]),
    recipient: zod.string().nonempty("Recipient is required"),
})

type EditEventNotifierFormData = zod.infer<typeof EditEventNotifierSchema>

type EditEventNotifierFormProps = {
    eventNotifier: AdminEventNotifier
}

export const EditEventNotifierForm = ({ eventNotifier }: EditEventNotifierFormProps) => {
    const { t } = useTranslation("notification-ui")
    const { handleSuccess } = useRouteModal()

    const form = useForm<EditEventNotifierFormData>({
        defaultValues: {
            event_name: eventNotifier.event_name,
            template_id: eventNotifier.template_id,
            channel: eventNotifier.channel,
            recipient_type: eventNotifier.recipient_type,
            recipient: eventNotifier.recipient,
        },
        resolver: zodResolver(EditEventNotifierSchema),
    })

    const { mutateAsync, isPending } = useUpdateEventNotifier(eventNotifier.id)
    const { channels = [] } = useNotificationProviders()

    const channelOptions = channels.map(channel => ({
        label: channel,
        value: channel
    }))

    const templates = useComboboxData({
        queryKey: notificationTemplatesQueryKeys.list({ type: "template" }),
        queryFn: (params) =>
            sdk.client.fetch<AdminNotificationTemplateListResponse>(
                "/admin/notification-templates",
                { query: { ...params, type: "template" } }
            ),
        getOptions: (data) =>
            data.notification_templates.map((template) => ({
                label: template.name,
                value: template.id,
            })),
    })

    const handleSubmit = form.handleSubmit(async (values) => {
        await mutateAsync(
            values,
            {
                onSuccess: () => {
                    toast.success(t("eventNotifiers.toast.updated"))
                    handleSuccess()
                },
                onError: (error) => toast.error(error.message),
            }
        )
    })

    return (
        <RouteDrawer.Form form={form}>
            <form
                onSubmit={handleSubmit}
                className="flex size-full flex-col overflow-hidden"
            >
                <RouteDrawer.Body className="flex-1 overflow-auto">
                    <div className="flex flex-col gap-y-4">
                        <Form.Field
                            control={form.control}
                            name="event_name"
                            render={({ field }) => {
                                return (
                                    <Form.Item>
                                        <Form.Label>{t("eventNotifiers.fields.eventName")}</Form.Label>
                                        <Form.Control>
                                            <Input
                                                {...field}
                                                placeholder={t("eventNotifiers.form.eventNamePlaceholder")}
                                            />
                                        </Form.Control>
                                        <Form.ErrorMessage />
                                    </Form.Item>
                                )
                            }}
                        />
                        <Form.Field
                            control={form.control}
                            name="template_id"
                            render={({ field: { onChange, value, ...field } }) => {
                                return (
                                    <Form.Item>
                                        <Form.Label>{t("eventNotifiers.fields.template")}</Form.Label>
                                        <Form.Control>
                                            <Combobox
                                                {...field}
                                                value={value}
                                                onChange={onChange}
                                                options={templates.options}
                                                searchValue={templates.searchValue}
                                                onSearchValueChange={templates.onSearchValueChange}
                                                fetchNextPage={templates.fetchNextPage}
                                                isFetchingNextPage={templates.isFetchingNextPage}
                                                placeholder={t("eventNotifiers.form.selectTemplate")}
                                            />
                                        </Form.Control>
                                        <Form.ErrorMessage />
                                    </Form.Item>
                                )
                            }}
                        />
                        <Form.Field
                            control={form.control}
                            name="channel"
                            render={({ field: { onChange, value, ...field } }) => {
                                return (
                                    <Form.Item>
                                        <Form.Label>{t("eventNotifiers.fields.channel")}</Form.Label>
                                        <Form.Control>
                                            <Combobox
                                                {...field}
                                                value={value}
                                                onChange={onChange}
                                                options={channelOptions}
                                                placeholder={t("eventNotifiers.form.selectChannel")}
                                            />
                                        </Form.Control>
                                        <Form.ErrorMessage />
                                    </Form.Item>
                                )
                            }}
                        />
                        <Form.Field
                            control={form.control}
                            name="recipient_type"
                            render={({ field }) => {
                                return (
                                    <Form.Item>
                                        <Form.Label>{t("eventNotifiers.fields.recipientType")}</Form.Label>
                                        <Form.Control>
                                            <Select {...field} onValueChange={field.onChange}>
                                                <Select.Trigger>
                                                    <Select.Value />
                                                </Select.Trigger>
                                                <Select.Content>
                                                    <Select.Item value="static">
                                                        {t("eventNotifiers.recipientTypes.static")}
                                                    </Select.Item>
                                                    <Select.Item value="entity_key">
                                                        {t("eventNotifiers.recipientTypes.entityKey")}
                                                    </Select.Item>
                                                </Select.Content>
                                            </Select>
                                        </Form.Control>
                                        <Form.ErrorMessage />
                                    </Form.Item>
                                )
                            }}
                        />
                        <Form.Field
                            control={form.control}
                            name="recipient"
                            render={({ field }) => {
                                return (
                                    <Form.Item>
                                        <Form.Label>{t("eventNotifiers.fields.recipient")}</Form.Label>
                                        <Form.Control>
                                            <Input
                                                {...field}
                                                placeholder={t("eventNotifiers.form.recipientPlaceholder")}
                                            />
                                        </Form.Control>
                                        <Form.Hint>{t("eventNotifiers.form.recipientHint")}</Form.Hint>
                                        <Form.ErrorMessage />
                                    </Form.Item>
                                )
                            }}
                        />
                    </div>
                </RouteDrawer.Body>
                <RouteDrawer.Footer>
                    <div className="flex items-center justify-end gap-x-2">
                        <RouteDrawer.Close asChild>
                            <Button variant="secondary" size="small">
                                {t("actions.cancel")}
                            </Button>
                        </RouteDrawer.Close>
                        <Button
                            type="submit"
                            variant="primary"
                            size="small"
                            isLoading={isPending}
                        >
                            {t("actions.save")}
                        </Button>
                    </div>
                </RouteDrawer.Footer>
            </form>
        </RouteDrawer.Form>
    )
}
