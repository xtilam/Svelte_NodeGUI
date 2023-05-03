<script lang="ts">
  import { RNSpinBox } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNSpinBox>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<spinBox {...$$restProps} bind:this={widget._el}>
  <slot />
</spinBox>
