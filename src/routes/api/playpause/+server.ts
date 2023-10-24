import type { RequestHandler } from './$types';

// we're forwarding all requests from the client to our server and then to the bot because our server doesn't care if we are sending requests to HTTP
// 

export const POST: RequestHandler = async () => {
    await fetch('http://16.171.140.144:7000/bot/playpause', {
        method: 'POST'
    });

    return new Response(null, {
        status: 200
    });
};