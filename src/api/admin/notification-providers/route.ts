import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const knex = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION)

    // Query notification_provider table using Knex
    const notificationProviders = await knex("notification_provider")
        .select("*")

    // Create a set of channels from all providers
    const channels = new Set<string>()

    notificationProviders.forEach((provider: any) => {
        if (provider.channels && Array.isArray(provider.channels)) {
            provider.channels.forEach((channel: string) => {
                channels.add(channel)
            })
        }
    })

    res.json({
        channels: Array.from(channels),
    })
}
