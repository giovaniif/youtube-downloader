<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Header from "./Header.svelte";
	
	let youtubeUrl = '';

	let didComponentMount = false;

	onMount(() => {
		didComponentMount = true;
	})


	let data;

	function sendURL() {
		fetch(`http://localhost:3333/info?URL=${youtubeUrl}`, 
			{ method: 'GET' }
		).then(res => res.json())
		.then(json => {
			const { videoDetails } = json;
			const { author } = videoDetails;
			const { avatar, name } = author;

			const { thumbnail } = videoDetails;
			const thumbnailUrl = thumbnail.thumbnails[0];
			
			const { title } = videoDetails;

			data = {
				avatar,
				name,
				thumbnailUrl,
				title,
			};

			console.log(data);
		});
	}

	function download() {
		window.location.href = `http://localhost:3333/download?URL=${youtubeUrl}`;
	}
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
		outline: 0;
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

	.video {
		margin-top: 20px;
		width: 340px;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

		display: flex;
		flex-direction: column;

		border-radius: 8px;
	}

	.video img.thumbnail {
		height: 160px;
		width: 100%;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	.content {
		display: flex;
		padding: 3px 6px;
		margin-top: 5px;
	}

	.content img.avatar {
		height: 60px;
		width: 100px;
		border-radius: 30px;
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}

	.info h1 {
		font-size: 14px;
		text-align: left;
		color: #fcfcfc;
	}

	.info p {
		font-size: 14px;
		font-weight: 600;
		color: #eee;
	}

	button#download {
		outline: 0;
		width: 340px;
		margin-top: 7px;
		padding: 15px 10px;
		background: #7159c1;
		color: #f8f8f8;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 16px;
		cursor: pointer;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		transition: all 0.5s;
	}

	button#download:hover {
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
		<button type="button" on:click="{sendURL}">Download</button>
	</div>

	{#if data}
	<div class="video">
		<img src={data.thumbnailUrl.url} alt={data.title} class="thumbnail"/>
		
		<div class="content">
			<img src={data.avatar} alt={data.name} class="avatar" />

			<div class="info">
				<h1>{data.title}</h1>
				<p>{data.name}</p>
			</div>
		</div>
	</div>
	<button type="button" id="download" on:click="{download}">Download</button>
	{/if}
</div>
{/if}
