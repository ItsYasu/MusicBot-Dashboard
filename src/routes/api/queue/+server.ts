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
const requet = 1
// so it's like a 3 way communication. frontend ---> backend ---> bot ---> backend ---> frontend
// because we cannot do frontend ---> bot directly because we can't call HTTP requests from HTTPS requests
// and the server doesn't care if we are sending requests to HTTP because it's badass