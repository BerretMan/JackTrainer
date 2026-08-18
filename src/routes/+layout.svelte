<script lang="ts">
	import Background from '$lib/components/Background.svelte';
    import './layout.css'
    let { children } = $props();
</script>

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
