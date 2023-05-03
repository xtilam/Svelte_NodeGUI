<script lang="ts">
  import { RNImage } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNImage>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
  
</script>

<image {...$$restProps} bind:this={widget._el} />
