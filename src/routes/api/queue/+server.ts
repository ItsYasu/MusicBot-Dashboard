import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const request = await fetch('http://16.171.140.144:7000/bot/queue');
    const response = await request.json();
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            'content-type': 'application/json'
        }
    });
};