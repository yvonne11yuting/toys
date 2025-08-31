// Admin permission utilities

/**
 * Get list of admin emails from environment variables
 */
export function getAdminEmails(): string[] {
    const adminEmails = process.env.ADMIN_EMAILS;
    if (!adminEmails) return [];

    return adminEmails
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email.length > 0);
}

/**
 * Check if a user email is an admin
 */
export function isAdmin(userEmail: string): boolean {
    const adminEmails = getAdminEmails();
    return adminEmails.includes(userEmail);
}

/**
 * Check if current user is admin (for server-side use)
 */
export function isCurrentUserAdmin(userEmail?: string): boolean {
    if (!userEmail) return false;
    return isAdmin(userEmail);
}

/**
 * Get admin count
 */
export function getAdminCount(): number {
    return getAdminEmails().length;
}
