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


<button class={color} style="--button-size: {size};" onclick={() => onclick()}><h2><b>{label}</b></h2></button>

<style lang="css">

    .red {
       background:radial-gradient(circle, #ff4d4d 0%, #cc0000 70%);
    }

    .blue {
       background:radial-gradient(circle, #4d94ff 0%, #0044cc 70%);
    }
    .green {
       background:radial-gradient(circle, #4dff88 0%, #009933 70%);
    }
    button {
        position: relative;
        width: var(--button-size);
        height: var(--button-size);
        margin: 2px;
        margin-left: 50px;
        border-radius: 50%;
        box-shadow: 4px 9px #000, inset 0 0 10px rgba(0, 0, 0, 0.5);
        align-items:center;
        justify-content: center;
        text-shadow: 2px 2px 4px  black;
    }

    button::before {

        content: "";
        position: absolute;
        inset: 0%;
        border-radius: 50%;
        background: repeating-conic-gradient(
            white 0 20deg,
            #FFD700 0 40deg
        );

        -webkit-mask: radial-gradient(circle, transparent 58%, black 30%);
        mask: radial-gradient(circle, transparent 58%, black 30%);
    }
    button:hover {
        transform: scale(1.10);
    }
    button:active {
        transform: translateY(10px);
        box-shadow: 0 0 0 darkred;
    }

</style>
