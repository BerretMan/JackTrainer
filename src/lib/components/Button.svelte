<script lang="ts">
    let {
      label,
      onclick,
      color ='red',
      size = '5em'
    }: {
      label: string | number;
      onclick: Function;
      color: string;
      size?: string;
    } = $props();
</script>


<button class={color} style="--button-size: {size};" onclick={() => onclick()}><h2 class="chip-text"><b>{label}</b></h2></button>

<style lang="css">
    .red {
       background:radial-gradient(circle at 30%, #ff4d4d 0%, #cc0000 100%);
    }

    .blue {
       background:radial-gradient(circle at 30%, #4d94ff 0%, #0044cc 100%);
    }
    .green {
       background:radial-gradient(circle at 30%, #4dff88 0%, #009933 100%);
    }
    .yellow {
           background: radial-gradient(circle at 30%, #ffff66 0%, #cc9900 100%);
        }
    button {
        position: relative;
        width: var(--button-size);
        height: var(--button-size);
        margin: 2px;
        border-radius: 50%;
        box-shadow: 4px 9px rgba(0,0,0,0.25), inset 0 0 10px rgba(0, 0, 0, 0.5);
        align-items:center;
        justify-content: center;
        text-shadow: 2px 2px 4px  black;
        padding: 1%;
        white-space: pre-wrap;
    }

    button::after {
        content: "";
        inset: 10%;
        position: absolute;
        border-radius: 50%;

        border: 1px solid black;
        box-shadow:
                0 0 0 2px rgba(0, 0, 0, 0.6),
                inset 0 0 0 2px rgba(0, 0, 0, 0.6);
    }
    button::before {

        content: "";
        position: absolute;
        inset: 0%;
        border-radius: 50%;
        background: repeating-conic-gradient(
            rgba(0,0,0,0%) 0 20deg,
            white 0 40deg
        );

        -webkit-mask: radial-gradient(circle, transparent 58%, black 30%);
        mask: radial-gradient(circle, transparent 58%, black 58%);
    }
    button:hover {
        transform: scale(1.10);
    }
    button:active {
        transform: translateY(10px);
        box-shadow: 0 0 0 darkred;
    }

</style>
