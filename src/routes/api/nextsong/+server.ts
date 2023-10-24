import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ }) => {


    await fetch('http://16.171.140.144:7000/bot/nextsong', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    return new Response();
};