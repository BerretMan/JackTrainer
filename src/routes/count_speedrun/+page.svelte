<script lang="ts">
	import '../layout.css';
	import { Card,Deck } from '$lib/engine/types.svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import CardComponent from '$lib/components/cardComponent.svelte';
	let { children } = $props();
	let deck = new Deck();
	let Count = $state(0);
	let showResult = $state(false);
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
    <h1>Hi-lo's speedrun </h1>

    <br>
    {#if isStart}
        <h2>{i}/{number_card}</h2>
        <h2>Time beetween each card: {timeBeetweenEachCard} ms</h2>
    {/if}
    <CardComponent card={c}></CardComponent>

    <h1>What's the Hi-Lo count?</h1>
    <br>

    <div class="flex flex-row justify-center items-center gap-4 flex-wrap w-full mt-4">

        <Button size="10em"  color='green' label='start easy' onclick={() => start(10,1000)}></Button>
        <Button size="10em"  color='blue' label='start medium' onclick={() => start(20,500)}></Button>
        <Button size="10em"  color='red' label='start hard' onclick={() => start(40,250)}></Button>
    </div>
    {#if askingCount}

        <Modal bind:showModal={askingCount}>
            {#if showResult==false}
                <h1>Count: {Count}</h1>
                <center>
                    <Button size="10em"  color='green' label='+1' onclick={() => Count++}></Button>
                    <Button size="10em"  color='red' label='-1' onclick={() => Count--}></Button>
                    <Button size="10em"  color='blue' label='submit' onclick={() => showResult=true}></Button>
                </center>
            {:else}
                <h1>Count = {result}</h1>
                {#if result==Count}
                    <h2>Well played</h2>
                {:else}
                    <h2>Better luck next time</h2>
                {/if}
                <center>
                    <Button size="10em"  color='red' label='replayed' onclick={() => {showResult=false;askingCount=false;}}></Button>
                </center>
            {/if}
        </Modal>
    {/if}
</center>


<style lang="css">
</style>
