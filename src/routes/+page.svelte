<script lang="ts">
	import { onMount } from 'svelte';

	// onMount is the first client side thing that gets called when the page is loaded FULLY
	let botStatus = 'PAUSED'; // PAUSED, PLAYING
	let statusLoaded = false;

	interface song {
		title: string;
		author: string;
		uri: string;
		position: number;
		pastTrack: boolean;
	}

	let musicQueue: song = [];
	let pastTrack: song = null;

	// LET is a variable that can be changed
	// CONST is a variable that cannot be changed
	const myWebsiteURL = 'https://www.youtube.com/watch?v=5qap5aO4i9A';
	// this is a constant, it cannot be changed

	const a = true;
	const b = 10;
	const c = 'hello';
	const d = 10.5;
	// async function fetchLastTrack() {
	// 	const request = await fetch('http://16.171.140.144:7000/bot/lasttrack');
	// 	const response = await request.json();

	// 	console.log(response);

	// }

	async function playLastTrack() {
		// await fetch('http://16.171.140.144:7000/bot/instantplay', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(pastTrack)
		// });

		await fetch('/api/instantplay', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(pastTrack)
		});
	}

	async function fetchQueue() {
		// const request = await fetch('http://16.171.140.144:7000/bot/queue');
		// const response = await request.json();
		const request = await fetch('/api/queue');
		const response = await request.json();

		//musicQueue = response;
		// you can look for changes in musicQueue, and basically don't replace it but update it so tracks that were there but aren't anymore don't get removed but just updated as "PAST"

		const oldQueue = musicQueue;

		if (oldQueue.length === 0) {
			musicQueue = response;
			return;
		}

		// we will check if the first position of the queue (song title) is the same as the new, and if it is, then we will add the old one to the past tracks
		if (oldQueue[0].title !== response[0].title) {
			pastTrack = oldQueue[0];
		}

		musicQueue = response;

		console.log(pastTrack);
	}

	onMount(async () => {
		console.log('Hello from +page');

		// if you have some chart you need to create or whatever, then here
		// wee need this, cause when the client loads the page fully, we will fetch the current bot status
		// const request = await fetch('http://16.171.140.144:7000/bot/status'); // this returns a GET
		// const response = await request.text();
		const request = await fetch('/api/status'); // this returns a GET
		const response = await request.text();

		await fetchQueue();

		botStatus = response;
		statusLoaded = true;

		setInterval(async () => {
			await fetchQueue();
		}, 5555);
	});

	async function playPauseBot() {
		// await fetch('http://16.171.140.144:7000/bot/playpause', {
		// 	method: 'POST'
		// });
		// botStatus = botStatus === 'PAUSED' ? 'PLAYING' : 'PAUSED';

		await fetch('/api/playpause', {
			method: 'POST'
		});
		botStatus = botStatus === 'PAUSED' ? 'PLAYING' : 'PAUSED';
	}
</script>

<div class="mt-10">
	<center>
		{#if statusLoaded}
			<p>Music is currently: {botStatus}</p>
		{/if}

		<div class="mt-10 mb-10">
			<img
				class="h-64"
				src="https://cdn.discordapp.com/attachments/1025037731253997659/1166285259135008798/pngtree-color-glare-music-banner-background-image_209655.jpg?ex=6549eeca&is=653779ca&hm=dedd9d1d8200fd167cf74d5ec267d490c909656ae5aa9fbc84cc13b21f120d43&"
				alt="MUSIC"
			/>
		</div>
		<!-- MT - margin (space) from the top -->
		<!-- mb - margin (space) from the bottom -->
		<!-- there also is ML and MR, or if you want margins on all side u can use simply like m-10 -->
		<!-- or if you want margins only vertically you can do my-10 and horizontally mx-10 -->

		<div style="display: flex; align-items: center; justify-content: center;">
			<!-- Left button -->
			<button
				class="btn variant-ringed-primary ml-2"
				on:click={async () => {
					playLastTrack();
				}}
			>
				Previous Track
			</button>

			<!-- Play/Pause button -->
			<button
				class="btn variant-ringed-primary ml-2 mr-2"
				on:click={async () => {
					playPauseBot();
				}}
			>
				{#if botStatus === 'PAUSED'}
					Play
				{:else}
					Pause
				{/if}
			</button>

			<!-- Right button -->
			<button
				class="btn variant-ringed-primary mr-2"
				on:click={async () => {
					playNextTrack();
				}}
			>
				Next Track
			</button>
		</div>
	</center>
</div>

<div class="mt-10">
	<!-- <center>
		<h1 class="text-3xl">Music Queue</h1>
		{#each musicQueue as song, i}
			<div class="mt-5">
				<p>{song}</p>
			</div>
		{/each}
	</center> -->
	<!-- My question is basicalle how would u make it to constantly check the endpoint of the queue api. -->

	<!-- there are 3 ways actually, one is just setting up a timer to fetch the queue status every few seconds, second one is a refresh button in the UI for the user to manually refresh stuff -->
	<!-- and the third one would be usage of WebSockets to dynamically update it in real time -->

	<center>
		<!-- <table>
			<thead>
				<tr> Song URL </tr>
			</thead>
			<tbody>
				 #EACH is basically a foreach function from programming languages 
				#EACH iterates through an array and returns the value and the index
				{#each musicQueue as song, i}
					<tr>
						<td>{i} {song}</td>
					</tr>
				{/each}
			</tbody> 
		</table> -->

		<!-- Responsive Container (recommended) -->
		{#if statusLoaded}
			<div class="table-container w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[50%]">
				<!-- Native Table Element -->
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Position</th>
							<th>Title</th>
							<th>URL</th>
							<!-- <th>Past Track</th> -->
						</tr>
					</thead>
					<tbody>
						{#each musicQueue as song, i}
							<tr>
								<td>{song.position}</td>
								<td>{song.title} by {song.author}</td>
								<td>{song.uri}</td>
								<!-- <td>{song.pastTrack ? 'YES' : 'NO'}</td> -->
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<th colspan="1">Total Songs in QUEUE</th>
							<td>{musicQueue.length}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		{/if}
	</center>
</div>
