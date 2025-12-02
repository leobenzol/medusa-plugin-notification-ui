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
  AdminNotificationTemplateListParams,
  AdminNotificationTemplateListResponse,
  AdminNotificationTemplateResponse,
  AdminCreateNotificationTemplate,
  AdminUpdateNotificationTemplate,
  AdminNotificationTemplateDeleteResponse,
} from "../../types/http/notification-template"

const NOTIFICATION_TEMPLATES_QUERY_KEY = "notification-templates" as const
export const notificationTemplatesQueryKeys = queryKeysFactory(NOTIFICATION_TEMPLATES_QUERY_KEY)

export const useNotificationTemplate = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      AdminNotificationTemplateResponse,
      FetchError,
      AdminNotificationTemplateResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: notificationTemplatesQueryKeys.detail(id),
    queryFn: async () => sdk.client.fetch<AdminNotificationTemplateResponse>("/admin/notification-templates/" + id),
    ...options,
  })

  return { ...data, ...rest }
}

export const useNotificationTemplates = (
  query?: AdminNotificationTemplateListParams,
  options?: Omit<
    UseQueryOptions<
      AdminNotificationTemplateListResponse,
      FetchError,
      AdminNotificationTemplateListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => sdk.client.fetch<AdminNotificationTemplateListResponse>("/admin/notification-templates", { query }),
    queryKey: notificationTemplatesQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateNotificationTemplate = (
  options?: UseMutationOptions<
    AdminNotificationTemplateResponse,
    FetchError,
    AdminCreateNotificationTemplate
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => sdk.client.fetch<AdminNotificationTemplateResponse>("/admin/notification-templates", {
      method: "POST",
      body: payload,
    }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: notificationTemplatesQueryKeys.lists(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateNotificationTemplate = (
  id: string,
  options?: UseMutationOptions<
    AdminNotificationTemplateResponse,
    FetchError,
    AdminUpdateNotificationTemplate
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => sdk.client.fetch<AdminNotificationTemplateResponse>("/admin/notification-templates/" + id, {
      method: "POST",
      body: payload,
    }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: notificationTemplatesQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: notificationTemplatesQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteNotificationTemplate = (
  id: string,
  options?: UseMutationOptions<
    AdminNotificationTemplateDeleteResponse,
    FetchError,
    void
  >
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => sdk.client.fetch<AdminNotificationTemplateDeleteResponse>("/admin/notification-templates/" + id, { method: "DELETE" }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: notificationTemplatesQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: notificationTemplatesQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteNotificationTemplateLazy = (
  options?: UseMutationOptions<
    AdminNotificationTemplateDeleteResponse,
    FetchError,
    string
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => sdk.client.fetch<AdminNotificationTemplateDeleteResponse>("/admin/notification-templates/" + id, { method: "DELETE" }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: notificationTemplatesQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: notificationTemplatesQueryKeys.detail(variables),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
