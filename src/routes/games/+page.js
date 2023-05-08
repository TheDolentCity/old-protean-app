import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getChannels } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/signin');
	}

	return {
		session,
		streamingChannels: {
			data: getChannels(supabaseClient)
		}
	};
};

export const prerender = true;
