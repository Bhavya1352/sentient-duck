export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("App Error Boundary caught:", error, context);
}
