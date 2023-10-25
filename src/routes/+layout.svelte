<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);
</script>

<!-- <slot /> -->

<AppShell>
	<svelte:fragment slot="header">
		{#if data.session}
			<AppBar
				gridColumns="grid-cols-3"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
			>
				<svelte:fragment slot="lead">
					<span class="text-lg font-semibold tracking-wider">Gapo Music</span>
				</svelte:fragment>

				<input
					type="text"
					class="w-96 h-8 p-1 input variant-form-material"
					placeholder="Search for music"
				/>

				<svelte:fragment slot="trail">
					<span class="btn btn-md variant-outline-primary">{data.session.user.username}</span>
					<a href="/logout" class="btn btn-md variant-outline-warning">Log Out</a>
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
