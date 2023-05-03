<script lang="ts">
  import { RNBoxView } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNBoxView>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<boxView {...$$restProps} bind:this={widget._el}>
  <slot />
</boxView>
