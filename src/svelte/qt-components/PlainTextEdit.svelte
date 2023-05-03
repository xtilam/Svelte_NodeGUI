<script lang="ts">
  import { RNPlainTextEdit } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNPlainTextEdit>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<plainTextEdit {...$$restProps} bind:this={widget._el}>
  <slot />
</plainTextEdit>
