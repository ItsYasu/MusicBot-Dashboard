import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({locals}) => {
    await locals.auth.invalidate();
    await locals.auth.setSession(null);
    
    throw redirect(307, "/"); // ctrl + .
};