<script lang="ts">
  import { RNAnimatedImage, RNButton } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNAnimatedImage>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
  
</script>

<animatedImage {...$$restProps} bind:this={widget._el} >
  <slot/>
</animatedImage>
