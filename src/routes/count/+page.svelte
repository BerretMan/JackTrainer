<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Card,Deck } from '$lib/engine/types.svelte';
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
<CardComponent card={c1}></CardComponent>
<CardComponent card={c2}></CardComponent>

    <h1>What's the Hi-Lo count?</h1>
    <div class="div choose">

        {#each choose as c}
            <button onclick={() => {click(c)}}>{c}</button>
        {/each}
    </div>
</center>

<style lang="css">
    button {
        padding: 20px;
        padding-left: 25px;
        padding-right: 25px
        margin: 2px;
        margin-left: 50px;
        background-color: red;
    }

</style>
