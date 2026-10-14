<script lang="ts">
	import Background from '$lib/components/Background.svelte';
    import './layout.css'
    import {onMount} from 'svelte';
    import {pwaInfo} from 'virtual:pwa-info';
    let { children } = $props();

    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';

    injectAnalytics({ mode: dev ? 'development' : 'production' });


    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    injectSpeedInsights();

    onMount(async () => {
      if (pwaInfo) {
        const {registerSW} = await import('virtual:pwa-register');
        registerSW({immediate: true});
      }
    });
    let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

    <svelte:head>
      <link rel="icon" href={"/favicon.svg"} />
      {@html webManifestLink}
      {#each ['clubs', 'diamonds', 'hearts', 'spades'] as c}
		{#each ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'king', 'queen'] as v}
			<link rel="preload" as="image" href="/cards/{v}_of_{c}.svg" />
		{/each}
		{/each}

      <meta name="theme-color" content="#FFD700" />
      <meta property="og:site_name" content="JackTrainer" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jack-trainer-kappa.vercel.app/" />
      <meta property="og:title" content="JackTrainer" />
        <meta property="og:description" content="Blackjack Strategy & Hi-Lo Trainer" />
        <meta property="og:image" content="/Overlay.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    </svelte:head>

<center>


    <div class="hidden md:block text-center mb-6">

        <h1>JackTrainer</h1>
        <h2>Become a <span class="golden">smarter</span> gambler</h2>

        <hr>
    </div>
    <br>
</center>
{@render children()}
<Background></Background>
