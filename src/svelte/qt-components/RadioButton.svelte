<script lang="ts">
  import { RNTab } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNTab>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<tab {...$$restProps} bind:this={widget._el}>
  <slot />
</tab>
