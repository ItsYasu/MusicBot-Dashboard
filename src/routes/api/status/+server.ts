import type { RequestHandler } from './$types';
import { bot_ip } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({locals}) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(307, '/login');
    }

    const request = await fetch(`http://${bot_ip}/bot/status`);
    const response = await request.text();

    return new Response(response, {
        status: 200,
        headers: {
            'content-type': 'text/plain'
        }
    });
};