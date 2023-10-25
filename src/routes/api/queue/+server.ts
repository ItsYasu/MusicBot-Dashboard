import type { RequestHandler } from './$types';
import { bot_ip } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({locals}) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(307, '/login');
    }

    const request = await fetch(`http://${bot_ip}/bot/queue`);
    const response = await request.json();
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            'content-type': 'application/json'
        }
    });
};

// so it's like a 3 way communication. frontend ---> backend ---> bot ---> backend ---> frontend
// because we cannot do frontend ---> bot directly because we can't call HTTP requests from HTTPS requests
// and the server doesn't care if we are sending requests to HTTP because it's badass


export const DELETE: RequestHandler = async ({locals, request}) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(307, '/login');
    }

    const {position} = await request.json();

    if (typeof position !== 'number' || !position) {
        return new Response("Not track position or error", {
            status: 400
        });
    }

    await fetch(`http://${bot_ip}/bot/queue`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ position })
    });

    return new Response(null, {
        status: 200
    });
}