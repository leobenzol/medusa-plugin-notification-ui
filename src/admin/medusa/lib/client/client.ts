import Medusa from "@medusajs/js-sdk"

export const backendUrl = process.env.BACKEND_URL ?? "/"
const authType = (process.env.AUTH_TYPE as "session" | "jwt") ?? "session"
const jwtTokenStorageKey = process.env.JWT_TOKEN_STORAGE_KEY || undefined

export const sdk = new Medusa({
  baseUrl: backendUrl,
  auth: {
    type: authType,
    jwtTokenStorageKey
  },
})

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== "undefined") {
  ;(window as any).__sdk = sdk
}
