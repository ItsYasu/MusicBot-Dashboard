import type { RequestHandler } from './$types';
import { bot_ip } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({locals}) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(307, '/login');
    }

    await fetch(`http://${bot_ip}/bot/instantplay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    return new Response();
};