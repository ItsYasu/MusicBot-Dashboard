import type { RequestHandler } from './$types';
import { auth } from '$lib/lucia';
import { auth_token } from '$lib/constants';
import { fail } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request }) => {
    const token = request.headers.get('authorization');
    if (!token) {
        return new Response('Missing authorization header', {
            status: 401
        });
    }

    if (token !== auth_token) {
        return new Response('Invalid authorization token', {
            status: 401
        });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
        return new Response('Missing username or password', {
            status: 400
        });
    }

    try {
        const user = await auth.createUser({
            key: {
                providerId: "username", // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password // hashed by Lucia
            },
            attributes: {
                username,
            }
        });
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
    } catch (e) {
        console.log(e);
        // this part depends on the database you're using
        // check for unique constraint error in user table
        return fail(500, {
            message: "An unknown error occurred"
        });
    }

    return new Response(null, {
        status: 200
    });
};