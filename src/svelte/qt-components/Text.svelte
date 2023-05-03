<script lang="ts">
  import { RNText } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNText>();

  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<text {...$$restProps} bind:this={widget._el}>
  <slot />
</text>
