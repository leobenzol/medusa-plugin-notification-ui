import { PencilSquare, Trash } from "@medusajs/icons"
import {
    Container,
    createDataTableColumnHelper,
    toast,
    usePrompt,
} from "@medusajs/ui"
import { keepPreviousData } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { DataTable } from "../../../medusa/components/data-table"
import { useDeleteEventNotifierLazy, useEventNotifiers } from "../../../hooks/use-event-notifiers"
import { useEventNotifierTableFilters } from "../../../hooks/use-event-notifier-table-filters"
import { useEventNotifierTableEmptyState } from "../../../hooks/use-event-notifier-table-empty-state"
import { useEventNotifierTableColumns } from "../../../hooks/use-event-notifier-table-columns"
import { useEventNotifierTableQuery } from "../../../hooks/use-event-notifier-table-query"
import { AdminEventNotifier } from "../../../../types/http/event-notifier"

const PAGE_SIZE = 20

export const EventNotifiersTable = () => {
    const { t } = useTranslation("notification-ui")

    const searchParams = useEventNotifierTableQuery({
        pageSize: PAGE_SIZE,
    })

    const { event_notifiers, count, isPending, isError, error } = useEventNotifiers(
        { ...searchParams },
        {
            placeholderData: keepPreviousData,
        }
    )

    const columns = useColumns()
    const filters = useEventNotifierTableFilters()
    const emptyState = useEventNotifierTableEmptyState()

    if (isError) {
        throw error
    }

    return (
        <Container className="p-0">
            <DataTable
                data={event_notifiers}
                columns={columns}
                rowCount={count}
                getRowId={(row) => row.id}
                pageSize={PAGE_SIZE}
                filters={filters}
                isLoading={isPending}
                emptyState={emptyState}
                heading={t("eventNotifiers.title")}
                action={{
                    label: t("actions.create"),
                    to: "create",
                }}
                rowHref={(row) => `${row.id}`}
            />
        </Container>
    )
}

const columnHelper = createDataTableColumnHelper<AdminEventNotifier>()

const useColumns = () => {
    const { t } = useTranslation("notification-ui")
    const prompt = usePrompt()
    const navigate = useNavigate()
    const base = useEventNotifierTableColumns()
    const { mutateAsync } = useDeleteEventNotifierLazy()

    const handleDelete = useCallback(
        async (eventNotifier: AdminEventNotifier) => {
            const confirm = await prompt({
                title: t("general.areYouSure"),
                description: t("eventNotifiers.deleteWarning"),
                confirmText: t("actions.delete"),
                cancelText: t("actions.cancel"),
            })

            if (!confirm) {
                return
            }

            await mutateAsync(eventNotifier.id, {
                onSuccess: () => {
                    toast.success(t("eventNotifiers.toast.deleted"))
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
                            },
                        ],
                    ]
                },
            }),
        ],
        [base, handleDelete, navigate, t]
    )
}
