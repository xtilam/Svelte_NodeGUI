<script lang="ts">
  import { RNDial } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNDial>();
  type $$Props = typeof widget._props & { value?: number };
  type $$Events = typeof widget._events;

  export let value = 0;

  widget.onMount(() => {
    widget.native.addEventListener("valueChanged", (v) => (value = v));
  });

</script>

<dial {...$$restProps} bind:this={widget._el}>
  <slot />
</dial>
