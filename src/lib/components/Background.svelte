<script lang="ts">

    import Button from '$lib/components/Button.svelte';

    function get_color(i:number): string {
      if (i%4==0) {return "red"}
      if (i%4==1) {return "blue"}
      if (i%4==2) {return "green"}
      if (i%4==3) {return "yellow"}
    }

    const number_array = Array.from({ length: 15}, (_, i) => i + 1);
</script>



<div class="background">

    {#each number_array as i}
        <div class="chip-animation chip-{i}" style="--left: {(i * 25)%90}%; --delay: {i * 0.5}s; --time: {(5 + i)}s;">
            <Button color={get_color(i)} label={i}></Button>
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
        filter: blur(4px);
        position:absolute;
        top: -10vh;
        left: var(--left);
        animation: fall var(--time) linear infinite;
        animation-delay: var(--delay);
    }
</style>
