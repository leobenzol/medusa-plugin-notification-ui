import { PencilSquare, Trash } from "@medusajs/icons"
import {
    Badge,
    Container,
    Heading,
    toast,
    usePrompt,
} from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ActionMenu } from "../../../medusa/components/common/action-menu"
import { SectionRow } from "../../../medusa/components/common/section"
import { AdminNotificationTemplate } from "../../../../types/http/notification-template"
import { useDeleteNotificationTemplate } from "../../../hooks/use-notification-templates"

type GeneralSectionProps = {
    notificationTemplate: AdminNotificationTemplate
}

export const GeneralSection = ({
    notificationTemplate,
}: GeneralSectionProps) => {
    const { t } = useTranslation("notification-ui")
    const prompt = usePrompt()
    const navigate = useNavigate()

    const { mutateAsync } = useDeleteNotificationTemplate(notificationTemplate.id)

    const handleDelete = async () => {
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

        await mutateAsync(undefined, {
            onSuccess: () => {
                toast.success(t("notificationTemplates.toast.delete"))
                navigate("/notification-templates", { replace: true })
            },
            onError: (e) => {
                toast.error(e.message)
            },
        })
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading>{notificationTemplate.name}</Heading>
                <div className="flex items-center gap-x-2">
                    <Badge color={notificationTemplate.type === "layout" ? "blue" : "green"}>
                        {t(`fields.${notificationTemplate.type}`)}
                    </Badge>
                    <ActionMenu
                        groups={[
                            {
                                actions: [
                                    {
                                        icon: <PencilSquare />,
                                        label: t("actions.edit"),
                                        to: `/notification-templates/${notificationTemplate.id}/edit`,
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
            </div>
            <SectionRow
                title={t("fields.description")}
                value={notificationTemplate.description}
            />
            {notificationTemplate.type === "template" && (
                <SectionRow
                    title={t("fields.layout")}
                    value={notificationTemplate.layout?.name}
                />
            )}
        </Container>
    )
}
