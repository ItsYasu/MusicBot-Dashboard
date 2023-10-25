import type { PageServerLoad } from './$types';
import { LuciaError } from "lucia";
import {auth} from '$lib/lucia';
import { fail, redirect } from '@sveltejs/kit';


export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    loginAction: async (event) => {
        console.log('loginAction');

        const formData = await event.request.formData();

        const username = formData.get('username');
        const password = formData.get('password');

        try {
            // find user by key
            // and validate password
            const key = await auth.useKey(
                "username",
                username.toLowerCase(),
                password
            );
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            });
            event.locals.auth.setSession(session); // set session cookie
        } catch (e) {
            console.log(e);
            if (
                e instanceof LuciaError &&
                (e.message === "AUTH_INVALID_KEY_ID" ||
                    e.message === "AUTH_INVALID_PASSWORD")
            ) {
                // user does not exist
                // or invalid password
                return fail(400, {
                    message: "Incorrect username or password"
                });
            }
            return fail(500, {
                message: "An unknown error occurred"
            });
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, "/");
    }
}