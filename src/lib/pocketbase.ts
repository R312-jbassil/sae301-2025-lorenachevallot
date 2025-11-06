/**
 * Determine PocketBase URL based on environment
 * - Development: http://127.0.0.1:8090
 * - Production: https://sae-301.lorena-chevallot.fr:8084
 */
export function getPocketBaseUrl(): string {
    // Check if we're running in a Node.js environment
    if (typeof process !== 'undefined') {
        // On GitHub Actions and production servers, NODE_ENV is 'production'
        if (process.env.NODE_ENV === 'production') {
            return 'https://sae-301.lorena-chevallot.fr:8084';
        }
        // Local development
        return 'http://127.0.0.1:8090';
    }

    // Client-side fallback (shouldn't be reached, but just in case)
    return 'https://sae-301.lorena-chevallot.fr:8084';
}
