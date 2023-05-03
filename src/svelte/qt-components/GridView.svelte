<script lang="ts">
  import { RNGridView } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNGridView>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<gridView {...$$restProps} bind:this={widget._el}>
  <slot />
</gridView>
