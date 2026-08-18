<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Move,Card,Deck } from '$lib/engine/types.svelte';
	import Button from '$lib/components/Button.svelte';
	import CardComponent from '$lib/components/cardComponent.svelte';

	let deck = new Deck();


	let d1 = $state(deck.pickCard());
	let p1 = $state(deck.pickCard());
	let p2 = $state(deck.pickCard());


	let choose = $state(['Double','Hit','Stand','Split']);
	let guess = $state(0);
	let win = $state(0);



    function get_color(c:string): string {
      if (c=='Double') {return "red"}
      if (c=='Hit') {return "blue"}
      if (c=='Stand') {return "green"}
      if (c=='Split') {return "yellow"}
    }

	function click(label:string):void {
	guess++;
	  let m = new Move();
	  m.add_player_card(p1);
	  m.add_player_card(p2);
	  m.add_dealer_card(d1);

	  const r = m.optimalMove();
	  console.log(r);
	  if ((r == 'H' && label == 'Hit') ||
	     (r == 'D' && label == 'Double') ||
	     (r == 'S' && label == 'Stand') ||
		 (r == 'P' && label == 'Split')) {win++}
	  deck = new Deck();
	  d1 = deck.pickCard();
	  p1 = deck.pickCard();
	  p2 = deck.pickCard();
	}
</script>

<center>
    <h1>Blackjack - Trainer mod</h1>

    <div class="stat">
        <hr>
        <h2>essai : {guess}</h2>
        <h2> réussite: {win}</h2>
        <h2> winrate: {((win/(guess))*100 || 0).toFixed(2)} %</h2>
        <hr>
    </div>

    <CardComponent card={d1}></CardComponent>
    <br>
    <CardComponent card={p1}></CardComponent>
    <CardComponent card={p2}></CardComponent>
    <br>
    {#each choose as c}
        <Button size="8em" color={get_color(c)} label={c} onclick={() => click(c)}></Button>
    {/each}

</center>

<style lang="css">
    hr {
        width: 30vw;
        height: 2px;
        color: var(--color-golden);
        background-color: var(--color-golden);
        border-width: 0.1px;
    }

</style>
