<script lang="ts">
  import { RNView } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNView>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<view {...$$restProps} bind:this={widget._el}>
  <slot />
</view>
 