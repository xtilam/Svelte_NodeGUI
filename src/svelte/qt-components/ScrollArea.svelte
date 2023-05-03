<script lang="ts">
  import { RNScrollArea } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNScrollArea>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<scrollArea {...$$restProps} bind:this={widget._el}>
  <slot />
</scrollArea>
