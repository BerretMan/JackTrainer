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

<center>
    <Button label={'Hi-lo count'} onclick={() => goto('/count')} size={'10em'}></Button>
</center>
<!---

<center>
    <h1>Blackjack</h1>
<CardComponent card={c}></CardComponent>

<button onclick={pickCard}>prends une carte</button><br>
<button onclick={() => {c.flip();}}>retourne la carte</button>
</center>
--->
