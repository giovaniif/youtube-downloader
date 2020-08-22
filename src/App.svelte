<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Header from "./Header.svelte";
	
	let youtubeUrl = '';

	let didComponentMount = false;

	onMount(() => {
		didComponentMount = true;
	})
</script>

<style>
  .container {
		padding: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		flex: 1;
	}
	
	.container h1 {
		color: #f8f8f8;
		text-align: center;
	}

	.input-block {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 52px;
	}

	.input-block input {
		height: 52px;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
		background: #201e25;
		width: 100%;
		max-width: 720px;
		outline: 0;
		font-size: 16px;
		color: #f8f8f8;
		border: none;
		padding: 0 20px;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		transition: box-shadow 0.5s;
	}

	.input-block input::placeholder {
		color: #a0a0a0;
	}

	.input-block input:focus {
		box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.3);
	}

	.input-block button {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		background: #7159c1;
		border: none;
		cursor: pointer;
		height: 52px;
		color: #f8f8f8;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 16px;
		font-weight: 400;
		padding: 5px 20px;
		transition: all 0.5s;
	}

	.input-block button:hover {
		box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.3);
		background: #654eb3;
	}
</style>

{#if didComponentMount}
<Header />
<div class="container">
	<h1 in:fade>Download Youtube Videos For Free</h1>
	<div class="input-block" in:fade>
		<input placeholder="Paste the Youtube URL here" bind:value={youtubeUrl} />
		<button type="button">Download</button>
	</div>
</div>
{/if}
