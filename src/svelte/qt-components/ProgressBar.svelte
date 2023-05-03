<script lang="ts">
  import { RNProgressBar } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNProgressBar>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<progressBar {...$$restProps} bind:this={widget._el}>
  <slot />
</progressBar>
