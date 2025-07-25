export function formatDate(dateValue: string | Date | undefined): string {
    if (!dateValue) return "N/A"; // handle undefined

    const date =
        typeof dateValue === "string" || dateValue instanceof Date
            ? new Date(dateValue)
            : null;

    if (!date || isNaN(date.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}
