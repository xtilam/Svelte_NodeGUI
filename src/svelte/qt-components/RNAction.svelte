<script lang="ts">
  import { RNAction } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNAction>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<action {...$$restProps} bind:this={widget._el}>
  <slot />
</action>
