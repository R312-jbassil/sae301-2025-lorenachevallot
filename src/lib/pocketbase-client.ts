import PocketBase from 'pocketbase';

// Déterminer l'URL de PocketBase en fonction de l'environnement
const pbUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8090'
    : 'https://sae-301.lorena-chevallot.fr';

const pb = new PocketBase(pbUrl);

export default pb;
