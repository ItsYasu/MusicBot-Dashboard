import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const request = await fetch('http://16.171.140.144:7000/bot/status');
    const response = await request.text();

    return new Response(response, {
        status: 200,
        headers: {
            'content-type': 'text/plain'
        }
    });
};