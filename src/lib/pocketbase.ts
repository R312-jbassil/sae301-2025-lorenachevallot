export function getPocketBaseUrl(): string {
    // Vérifier si nous sommes en développement
    const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';
    
    if (isDev) {
        return 'http://127.0.0.1:8090';
    }
    
    // Production
    return 'https://sae-301.lorena-chevallot.fr:8084';
}
