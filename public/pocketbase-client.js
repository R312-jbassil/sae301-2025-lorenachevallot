// pocketbase-client.js
// URL de PocketBase
const pbUrl = window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8090'
    : 'https://sae-301.lorena-chevallot.fr';

// Créer une instance PocketBase via CDN
export async function initPocketBase() {
    if (!window.PocketBase) {
        const script = document.createElement('script');
        script.src = `${pbUrl}/api/files/migrations.js`;
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    return new window.PocketBase(pbUrl);
}

export default { initPocketBase };
