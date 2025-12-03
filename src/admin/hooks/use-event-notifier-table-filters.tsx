import { useMemo } from "react"
import { useDataTableDateFilters } from "../medusa/components/data-table/helpers/general/use-data-table-date-filters"

export const useEventNotifierTableFilters = () => {
    const dateFilters = useDataTableDateFilters()

    return useMemo(
        () => [
            ...dateFilters,
        ],
        [dateFilters]
    )
}
