<script lang="ts">
    import { goto } from "$app/navigation";
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Card,Deck } from '$lib/engine/types.svelte';
	import CardComponent from '$lib/components/cardComponent.svelte';
	import Button from '$lib/components/Button.svelte';
	let { children } = $props();

	let deck = new Deck();

	let c = $state(deck.pickCard());

	function pickCard() {
	  c = deck.pickCard();
	}

</script>


<center>
    <h1>Select a gamemode</h1>
</center>

<br>
<center>
    <div class="button-container">
        <Button color="red" label={'Hi-lo count'} onclick={() => goto('/count')} size={'10em'}></Button>
        <Button color="green" label={'Hi-lo Speedrun'} onclick={() => goto('/count')} size={'10em'}></Button>
        <Button color="blue" label={'Best Move'} onclick={() => goto('/train')} size={'10em'}></Button>

    </div>
</center>

<style lang="css">
    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        width: fit-content;
        gap: 2em;
    }


</style>
