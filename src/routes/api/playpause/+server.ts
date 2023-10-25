import type { RequestHandler } from './$types';
import { bot_ip } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

// we're forwarding all requests from the client to our server and then to the bot because our server doesn't care if we are sending requests to HTTP
// 

export const POST: RequestHandler = async ({locals}) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(307, '/login');
    }

    await fetch(`http://${bot_ip}/bot/playpause`, {
        method: 'POST'
    });

    return new Response(null, {
        status: 200
    });
};