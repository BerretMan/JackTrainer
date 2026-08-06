<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Card,Deck } from '$lib/engine/types.svelte';
	import Button from '$lib/components/Button.svelte';
	import CardComponent from '$lib/components/cardComponent.svelte';
	let { children } = $props();

	let deck = new Deck();

	let c1 = $state(deck.pickCard());
	let c2 = $state(deck.pickCard());

	let choose = $state([-2,-1,0,1,2]);

	let guess = $state(0);
	let win = $state(0);


	function click(valeur) {
	    guess++;

		if (valeur == c1.countValue+c2.countValue) {
		  win++;
		}
		deck = new Deck();
		c1 =  deck.pickCard();
		c2 = deck.pickCard();
	}
</script>

<center>
    <h1>Blackjack - Hi-lo's count </h1>

    <h2>essai : {guess}</h2>
    <h2> réussite: {win}</h2>
    <h2> winrate: {((win/(guess))*100 || 0).toFixed(2)} %</h2>
    <br>
    <CardComponent card={c1}></CardComponent>
    <CardComponent card={c2}></CardComponent>

    <h1>What's the Hi-Lo count?</h1>
    <div class="div choose">

        {#each choose as c}
            <Button color={c < 0 ? 'red': c === 0 ? 'blue' : 'green'} label={c} onclick={() => click(c)}></Button>
        {/each}
    </div>
</center>
