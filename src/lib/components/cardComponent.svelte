<script lang="ts">
    import type { Card } from '$lib/engine/types';

    let {
      card,
    }: {
      card: Card;
    } = $props();
</script>

<div class="card-container">
    <div class="card-inner" class:flipped={card.hidden}>
        <div class="card-face card-front">
            <img src="{card.getImage()}" alt="{card.name}">
        </div>

        <div class="card-face card-back">
            <img src="/cards/back.png" alt="{card.name}">

        </div>
    </div>
</div>


<style lang="css">
      .card-container {
        background-color: transparent;
        width: 200px;
        height: 290px;
        perspective: 1000px;
        display: inline-block;
        margin: 10px;
      }

      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.4s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 8px;
      }

      .card-inner.flipped {
        transform: rotateY(180deg);
      }

      .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 8px;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
      }

      .card-face img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card-back {
        transform: rotateY(180deg);
      }
</style>
