<script lang="ts">
  import { RNWindow } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNWindow>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<window {...$$restProps} bind:this={widget._el}>
  <slot />
</window>
