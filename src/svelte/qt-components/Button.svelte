<script lang="ts">
  import { RNButton } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNButton>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<button {...$$restProps} bind:this={widget._el}>
  <slot />
</button>
