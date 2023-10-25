<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container p-10 card m-10 mx-auto w-[30%] variant-glass-surface">
	<form use:enhance action="?/loginAction" method="POST">
		<div class="mb-6 space-y-6">
			<input
				type="text"
				name="username"
				class="input variant-form-material p-1"
				placeholder="Username"
			/>
			<input
				type="password"
				name="password"
				class="mt-3 input variant-form-material p-1"
				placeholder="Password"
			/>
		</div>
		<center><button class="mt-4 btn variant-ringed-primary mx-auto">Log In</button></center>
	</form>
</div>
