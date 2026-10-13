<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        showModal: boolean;
        header?: Snippet;
        children?: Snippet;
    }
    let {showModal = $bindable(), header, children }: Props = $props();
</script>

{#if showModal}
    <main>
        <div class ="modal">
            {#if header} {@render header()} {/if}
            {@render children?.()}
        </div>
    </main>
{/if}

<style lang="css">
    main {
        position: fixed;
        inset:0;
        background: rgba(0,0,0,0.6);
        background-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal {
        height: 25vh;
        width: 620px;
        max-width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        background:  #000000;
        border-radius: 20px;
        border: 1px solid var(--border-200);
        box-shadow: 0 24px 60px rgba(10, 18, 40, 0.25);
        display: flex;
        flex-direction: column;
    }
</style>
