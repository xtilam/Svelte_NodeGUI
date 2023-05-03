<script lang="ts">
  import { RNSvg } from "src/rng/dom/react-nodegui/src";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNSvg>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<svg {...$$restProps} bind:this={widget._el}>
  <slot />
</svg>
