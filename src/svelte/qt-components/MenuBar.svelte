<script lang="ts">
  import { RNMenuBar } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNMenuBar>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<menuBar {...$$restProps} bind:this={widget._el}>
  <slot />
</menuBar>
