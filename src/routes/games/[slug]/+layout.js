import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getChannel } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/signin');
	}

	const channel = await getChannel(supabaseClient, event.params.slug);

	return {
		session,
		header: event.params.slug,
		channel
	};
};