import PocketBase from 'pocketbase';

let path = '';
if (import.meta.env.MODE === 'development') {
    path = 'http://127.0.0.1:8090'; // localhost = machine de dev
} else {
    path = 'https://sae-301.lorena-chevallot.fr:8084'; // production avec port 8084
}

const pb = new PocketBase(path);

export function getPocketBaseUrl(): string {
    return path;
}

export default pb;
