import type { APIRoute } from 'astro';
import pb from '../lib/pocketbase.ts';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { action, email, password, prenom, nom } = data;

        if (action === 'login') {
            const authData = await pb.collection('utilisateur').authWithPassword(email, password);
            return new Response(JSON.stringify(authData), { status: 200 });
        } else if (action === 'register') {
            const record = await pb.collection('utilisateur').create({
                email,
                password,
                passwordConfirm: password,
                prenom,
                nom,
            });
            return new Response(JSON.stringify(record), { status: 201 });
        }

        return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
    } catch (error) {
        console.error('Auth error:', error);
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), { status: 500 });
    }
};
