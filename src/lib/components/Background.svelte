<script lang="ts">

    import Button from '$lib/components/Button.svelte';

    function get_color(i:number): string {
      if (i%4==0) {return "red"}
      if (i%4==1) {return "blue"}
      if (i%4==2) {return "green"}
      if (i%4==3) {return "yellow"}
    }


    const paralax_array = [
      {size: "8em", blur:"3px",time: 5, zIndex: 10},
      {size: "6em", blur:"5px",time: 8, zIndex: 5},
      {size: "4em", blur:"7px",time: 12, zIndex: -5},
      {size: "2em", blur:"9px",time: 18, zIndex: -10}
    ];

    const number_array = Array.from({ length: 30 }, (_, i) => ({
        number: i + 1,
        paralax: paralax_array[Math.floor(Math.random() * paralax_array.length)]
    }));
</script>


<div class="background">

    {#each number_array as item}
        {@const i = item.number}
        {@const p = item.paralax}
        <div class="chip-animation chip-{i}" style="
                --left: {(i * 37)%90}%;
                --delay: {i * 0.5}s;
                --time: {p.time}s;
                --blur: {p.blur};
                --z: {p.zIndex};">
                    <Button color={get_color(i)} label="{i}€" size={p.size}></Button>
        </div>
    {/each}
</div>

<style lang="css">
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
    }

    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(110vh) rotate(360deg);
        }
    }

    .chip-animation {
        filter: blur(var(--blur));
        position:absolute;
        top: -10vh;
        left: var(--left);
        animation: fall var(--time) linear infinite;
        animation-delay: var(--delay);
        z-index: var(--z);
    }
</style>
