<script lang="ts">
	import Background from '$lib/components/Background.svelte';
    import './layout.css'
    let { children } = $props();
</script>

<center>

    <h1>JackTrainer</h1>
    <h2>Become a <span class="golden">smarter</span> gambler</h2>

    <hr>
    <br>
</center>
{@render children()}
<Background></Background>
