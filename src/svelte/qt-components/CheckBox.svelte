<script lang="ts">
  import { RNCheckBox, RNView } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNCheckBox>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<checkBox {...$$restProps} bind:this={widget._el}>
  <slot />
</checkBox>
