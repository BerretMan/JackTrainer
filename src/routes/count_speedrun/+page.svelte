<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Card,Deck } from '$lib/engine/types.svelte';
	import Button from '$lib/components/Button.svelte';
	import CardComponent from '$lib/components/cardComponent.svelte';
	let { children } = $props();
	let deck = new Deck();

	let c = $state(deck.pickCard());
	c.flip()

	let number_card = $state(0);
	let timeBeetweenEachCard = $state(0);
	let answer = $state(0);

    let result = $state(0);

    let i = $state(0)
    let isStart = $state(false);
	let askingCount = $state(false);
	function sleep(ms: number) {
	  return new Promise((resolve) => setTimeout(resolve,ms))
	}


	async function start(n_card: number,ms: number) {
	    isStart = true;
		number_card = n_card;
		timeBeetweenEachCard = ms;
	    for (i=0;i<n_card;i++) {
	      result += c.countValue;
		  c= deck.pickCard();
		  await sleep(ms);
		}
		c.flip();
		prompt("le" + result);
		askingCount = true;
	}

	function validate() {
	  if (answer == result) {
	 		prompt("bien joué");
	  }

    isStart = false;


	}
</script>

<center>
    <h1>Blackjack - Hi-lo's speedrun </h1>

    <br>
    {#if isStart}
        <h2>{i}/{number_card}</h2>
        <h2>Temps entre chaque carte: {timeBeetweenEachCard} ms</h2>
    {/if}
    <CardComponent card={c}></CardComponent>

    <h1>What's the Hi-Lo count?</h1>

    <Button size="10em"  color='green' label='start easy' onclick={() => start(10,1000)}></Button>
    <Button size="10em"  color='yellow' label='start medium' onclick={() => start(20,500)}></Button>
    <Button size="10em"  color='red' label='start hard' onclick={() => start(40,250)}></Button>

    {#if askingCount}
        <label>Quel est le count? </label>
  		<input
			type="number"
			bind:value={answer}
			autofocus
			onkeydown={(e) => e.key === 'Enter' && validate()}
			style="position: relative; z-index: 9999; pointer-events: auto; color: black; background: white;"
		/>
    {/if}
</center>
