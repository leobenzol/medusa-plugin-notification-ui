import { PencilSquare, Trash } from "@medusajs/icons"
import { Container, Heading, Text, usePrompt, toast } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { AdminEventNotifier } from "../../../../../types/http/event-notifier"
import { ActionMenu } from "../../../../medusa/components/common/action-menu"
import { useDeleteEventNotifier } from "../../../../hooks/use-event-notifiers"

type GeneralSectionProps = {
    eventNotifier: AdminEventNotifier
}

export const GeneralSection = ({ eventNotifier }: GeneralSectionProps) => {
    const { t } = useTranslation("notification-ui")
    const navigate = useNavigate()
    const prompt = usePrompt()
    const { mutateAsync } = useDeleteEventNotifier(eventNotifier.id)

    const handleDelete = async () => {
        const confirm = await prompt({
            title: t("general.areYouSure"),
            description: t("eventNotifiers.deleteWarning"),
            confirmText: t("actions.delete"),
            cancelText: t("actions.cancel"),
        })

        if (!confirm) {
            return
        }

        await mutateAsync(undefined, {
            onSuccess: () => {
                toast.success(t("eventNotifiers.toast.deleted"))
                navigate("..", { replace: true })
            },
            onError: (e) => {
                toast.error(e.message)
            },
        })
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex flex-col gap-y-1">
                    <Heading>{eventNotifier.event_name}</Heading>
                    <Text className="text-ui-fg-subtle">
                        {t("eventNotifiers.detail.subtitle")}
                    </Text>
                </div>
                <ActionMenu
                    groups={[
                        {
                            actions: [
                                {
                                    icon: <PencilSquare />,
                                    label: t("actions.edit"),
                                    to: "edit",
                                },
                            ],
                        },
                        {
                            actions: [
                                {
                                    icon: <Trash />,
                                    label: t("actions.delete"),
                                    onClick: handleDelete,
                                },
                            ],
                        },
                    ]}
                />
            </div>
            <div className="text-ui-fg-subtle grid grid-cols-2 gap-3 px-6 py-4">
                <div className="flex flex-col gap-y-1">
                    <Text size="small" leading="compact" weight="plus">
                        {t("eventNotifiers.fields.eventName")}
                    </Text>
                    <Text size="small" leading="compact">
                        {eventNotifier.event_name}
                    </Text>
                </div>
                <div className="flex flex-col gap-y-1">
                    <Text size="small" leading="compact" weight="plus">
                        {t("eventNotifiers.fields.channel")}
                    </Text>
                    <Text size="small" leading="compact">
                        {eventNotifier.channel}
                    </Text>
                </div>
                <div className="flex flex-col gap-y-1">
                    <Text size="small" leading="compact" weight="plus">
                        {t("eventNotifiers.fields.template")}
                    </Text>
                    <Text size="small" leading="compact">
                        {eventNotifier.template_id}
                    </Text>
                </div>
                <div className="flex flex-col gap-y-1">
                    <Text size="small" leading="compact" weight="plus">
                        {t("eventNotifiers.fields.recipientType")}
                    </Text>
                    <Text size="small" leading="compact">
                        {t(`eventNotifiers.recipientTypes.${eventNotifier.recipient_type === "static" ? "static" : "entityKey"}`)}
                    </Text>
                </div>
                <div className="flex flex-col gap-y-1">
                    <Text size="small" leading="compact" weight="plus">
                        {t("eventNotifiers.fields.recipient")}
                    </Text>
                    <Text size="small" leading="compact">
                        {eventNotifier.recipient}
                    </Text>
                </div>
            </div>
        </Container>
    )
}
