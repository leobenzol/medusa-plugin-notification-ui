import { useQueryParams } from "../medusa/hooks/use-query-params"

type UseEventNotifierTableQueryProps = {
    prefix?: string
    pageSize?: number
}

export const useEventNotifierTableQuery = ({
    prefix,
    pageSize = 20,
}: UseEventNotifierTableQueryProps) => {
    const queryObject = useQueryParams(
        ["offset", "q", "order"],
        prefix
    )

    const { offset, order, ...rest } = queryObject
    const searchParams = {
        limit: pageSize,
        offset: offset ? Number(offset) : 0,
        order: order ?? undefined,
        ...rest,
    }

    return searchParams
}
