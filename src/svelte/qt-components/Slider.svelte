<script lang="ts">
  import { RNSlider } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNSlider>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<slider {...$$restProps} bind:this={widget._el}>
  <slot />
</slider>
