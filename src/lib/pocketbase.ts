import PocketBase from 'pocketbase';

// Déterminer l'URL de PocketBase en fonction de l'environnement
const pbUrl = import.meta.env.MODE === 'production'
    ? 'https://sae-301.lorena-chevallot.fr:8084'
    : 'http://127.0.0.1:8090';

const pb = new PocketBase(pbUrl);

export default pb;

export function getPocketBaseUrl(): string {
    return pbUrl;
}
