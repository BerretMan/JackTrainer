<script lang="ts">
    import { onMount } from 'svelte';
    import CardComponent from '$lib/components/cardComponent.svelte';
    import Button from '$lib/components/Button.svelte';
	import {Move,Deck} from '$lib/engine/types.svelte.ts';
	import type {Action} from '$lib/engine/types.svelte.ts';
	let m = $state(new Move());
	let d = $state(new Deck());
	let partyEnd=$state(false);

	onMount(() => {
	  m.add_player_card(d.pickCard());
	  m.add_player_card(d.pickCard());
	  m.add_dealer_card(d.pickCard());

	})
	function game(a: Action) {
	  if (partyEnd) return;

	  if (a =='H') {
	      m.add_player_card(d.pickCard());
		  if (m.p_score > 21) {
		      gameOverOrNextHand()
			  }
		  }
		  if (a=='P') {
		      m.split(d.pickCard(),d.pickCard());
		  }
		  if (a== 'S') {
		      gameOverOrNextHand();
		  }

		  if(m.d_score >21 || m.p_score >21) {partyEnd=true}

	}

	async function gameOverOrNextHand(){
	  if(m.p_i < m.p_hands.length -1) {
			m.p_i++;
	  } else {
			while (m.d_score < 17) {
			  m.add_dealer_card(d.pickCard());
			  await new Promise(r => setTimeout(r,300));
			}
			partyEnd=true;
		}
	}

	function restart() {
	    m = new Move();
		d = new Deck();

        m.add_player_card(d.pickCard());
        m.add_player_card(d.pickCard());
        m.add_dealer_card(d.pickCard());
		partyEnd=false;
	}
</script>

<center>

{#each m.d_cards as c}
    <CardComponent card={c}></CardComponent>
{/each}

<p>{m.d_score}</p>
</center>
<center>
<br><br>
{#each m.p_hands as h,i}
    <div style ="opacity: {i==m.p_i ? '1' : '0.5'}">
        {#each h.cards as c}
            <CardComponent card={c}></CardComponent>
        {/each}
    </div>
{/each}

<p>{m.p_score}</p>
<br>
{#if partyEnd===false}
    <Button size="10em"  color='red' label='Hit' onclick={() => game('H')}></Button>
    <Button size="10em"  color='blue' label='Stand' onclick={() => game('S')}></Button>
    {#if m.p_cards.length ===2 && m.p_cards[0].value == m.p_cards[1].value}
        <Button size="10em"  color='yellow' label='Split' onclick={() => game('P')}></Button>
    {/if}
{/if}
</center>

<br>

{#if partyEnd===true}
    <center>
        <Button size="10em"  color='grey' label='Restart' onclick={() => restart()}></Button>
    </center>
{/if}
