import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const pastTrack = await request.json();

    await fetch('http://16.171.140.144:7000/bot/instantplay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pastTrack)
    });

    return new Response();
};