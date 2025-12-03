import { FetchError } from "@medusajs/js-sdk"
import {
    QueryKey,
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"
import { sdk } from "../medusa/lib/client"
import { queryKeysFactory } from "../medusa/lib/query-key-factory"
import {
    AdminEventNotifierListParams,
    AdminEventNotifierListResponse,
    AdminEventNotifierResponse,
    AdminCreateEventNotifier,
    AdminUpdateEventNotifier,
    AdminEventNotifierDeleteResponse,
} from "../../types/http/event-notifier"

const EVENT_NOTIFIERS_QUERY_KEY = "event-notifiers" as const
export const eventNotifiersQueryKeys = queryKeysFactory(EVENT_NOTIFIERS_QUERY_KEY)

export const useEventNotifier = (
    id: string,
    options?: Omit<
        UseQueryOptions<
            AdminEventNotifierResponse,
            FetchError,
            AdminEventNotifierResponse,
            QueryKey
        >,
        "queryFn" | "queryKey"
    >
) => {
    const { data, ...rest } = useQuery({
        queryKey: eventNotifiersQueryKeys.detail(id),
        queryFn: async () => sdk.client.fetch<AdminEventNotifierResponse>("/admin/event-notifiers/" + id),
        ...options,
    })

    return { ...data, ...rest }
}

export const useEventNotifiers = (
    query?: AdminEventNotifierListParams,
    options?: Omit<
        UseQueryOptions<
            AdminEventNotifierListResponse,
            FetchError,
            AdminEventNotifierListResponse,
            QueryKey
        >,
        "queryFn" | "queryKey"
    >
) => {
    const { data, ...rest } = useQuery({
        queryFn: () => sdk.client.fetch<AdminEventNotifierListResponse>("/admin/event-notifiers", { query }),
        queryKey: eventNotifiersQueryKeys.list(query),
        ...options,
    })

    return { ...data, ...rest }
}

export const useCreateEventNotifier = (
    options?: UseMutationOptions<
        AdminEventNotifierResponse,
        FetchError,
        AdminCreateEventNotifier
    >
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => sdk.client.fetch<AdminEventNotifierResponse>("/admin/event-notifiers", {
            method: "POST",
            body: payload,
        }),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: eventNotifiersQueryKeys.lists(),
            })
            options?.onSuccess?.(data, variables, context)
        },
        ...options,
    })
}

export const useUpdateEventNotifier = (
    id: string,
    options?: UseMutationOptions<
        AdminEventNotifierResponse,
        FetchError,
        AdminUpdateEventNotifier
    >
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => sdk.client.fetch<AdminEventNotifierResponse>("/admin/event-notifiers/" + id, {
            method: "POST",
            body: payload,
        }),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: eventNotifiersQueryKeys.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: eventNotifiersQueryKeys.detail(id),
            })

            options?.onSuccess?.(data, variables, context)
        },
        ...options,
    })
}

export const useDeleteEventNotifier = (
    id: string,
    options?: UseMutationOptions<
        AdminEventNotifierDeleteResponse,
        FetchError,
        void
    >
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => sdk.client.fetch<AdminEventNotifierDeleteResponse>("/admin/event-notifiers/" + id, { method: "DELETE" }),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: eventNotifiersQueryKeys.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: eventNotifiersQueryKeys.detail(id),
            })

            options?.onSuccess?.(data, variables, context)
        },
        ...options,
    })
}

export const useDeleteEventNotifierLazy = (
    options?: UseMutationOptions<
        AdminEventNotifierDeleteResponse,
        FetchError,
        string
    >
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => sdk.client.fetch<AdminEventNotifierDeleteResponse>("/admin/event-notifiers/" + id, { method: "DELETE" }),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: eventNotifiersQueryKeys.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: eventNotifiersQueryKeys.detail(variables),
            })

            options?.onSuccess?.(data, variables, context)
        },
        ...options,
    })
}
