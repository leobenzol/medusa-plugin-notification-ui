import { FetchError } from "@medusajs/js-sdk"
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query"
import { sdk } from "../medusa/lib/client"

type NotificationProvidersResponse = {
  channels: string[]
}

export const useNotificationProviders = (
  options?: Omit<
    UseQueryOptions<
      NotificationProvidersResponse,
      FetchError,
      NotificationProvidersResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["notification-providers"],
    queryFn: async () =>
      sdk.client.fetch<NotificationProvidersResponse>(
        "/admin/notification-providers"
      ),
    ...options,
  })

  return { ...data, ...rest }
}
