import { useQueryParams } from "../medusa/hooks/use-query-params"

type UseNotificationTemplateTableQueryProps = {
  prefix?: string
  pageSize?: number
}

export const useNotificationTemplateTableQuery = ({
  prefix,
  pageSize = 20,
}: UseNotificationTemplateTableQueryProps) => {
  const queryObject = useQueryParams(
    ["offset", "q", "order", "created_at", "updated_at", "name", "type"],
    prefix
  )

  const { offset, created_at, updated_at, name, type, order, ...rest } = queryObject
  const searchParams = {
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    created_at: created_at ? JSON.parse(created_at) : undefined,
    updated_at: updated_at ? JSON.parse(updated_at) : undefined,
    name: name ? JSON.parse(name) : undefined,
    type: type ? JSON.parse(type) : undefined,
    // TODO: handle better layout.name sorting in the future
    order: order?.replace("layout_name", "layout.name") ?? undefined,
    ...rest,
  }

  return searchParams
}
