/**
 * Utility function to get the base URL of the application
 * This works in both client and server contexts
 */
export function getBaseUrl(): string {
  // For client-side, use the window.location
  if (typeof window !== "undefined") {
    const protocol = window.location.protocol
    const host = window.location.host
    return `${protocol}//${host}`
  }

  // For server-side, use a default value
  // This avoids the need for environment variables
  return "http://localhost:3000"
}
