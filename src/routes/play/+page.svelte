<script lang="ts">
    import { onMount } from 'svelte';
    import CardComponent from '$lib/components/cardComponent.svelte';
    import Button from '$lib/components/Button.svelte';
	import {Move,Deck} from '$lib/engine/types.svelte.ts';
	import type {Action} from '$lib/engine/types.svelte.ts';
	const m = new Move();
	const d = new Deck();

	onMount(() => {
	  m.add_player_card(d.pickCard());
	  m.add_player_card(d.pickCard());
	  m.add_dealer_card(d.pickCard());

	})
	function game(a: Action) {
	    if (a =='H') {
		   m.add_player_card(d.pickCard());
		}
		if (a== 'S') {
		    while(m.d_score <17) {
				m.add_dealer_card(d.pickCard());
			}
		}
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
{#each m.p_cards as c}
    <CardComponent card={c}></CardComponent>
{/each}

<p>{m.p_score}</p>
<br>
 <Button size="10em"  color='green' label='Hit' onclick={() => game('H')}></Button>
 <Button size="10em"  color='green' label='Stand' onclick={() => game('S')}></Button>
</center>
