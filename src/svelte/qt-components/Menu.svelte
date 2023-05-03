<script lang="ts">
  import { RNMenu } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNMenu>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<menu {...$$restProps} bind:this={widget._el}>
  <slot />
</menu>
