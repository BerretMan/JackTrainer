<script lang="ts">
	import Background from '$lib/components/Background.svelte';
    import './layout.css'
    let { children } = $props();
</script>

<center>

    <h1>JackTrainer</h1>
    <h2 class="golden">Become a smarter gambler</h2>

    <hr>
    <br>
</center>
{@render children()}
<Background></Background>
