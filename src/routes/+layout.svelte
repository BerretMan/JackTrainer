<script lang="ts">
	import Background from '$lib/components/Background.svelte';
    import './layout.css'
    let { children } = $props();

    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';

    injectAnalytics({ mode: dev ? 'development' : 'production' });


    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    injectSpeedInsights();
</script>
    <svelte:head>
      <link rel="icon" href={"/favicon.svg"} />
    </svelte:head>

<center>


    <div class="hidden md:block text-center mb-6">

        <h1>JackTrainer</h1>
        <h2>Become a <span class="golden">smarter</span> gambler</h2>

    </div>
    <hr>
    <br>
</center>
{@render children()}
<Background></Background>
