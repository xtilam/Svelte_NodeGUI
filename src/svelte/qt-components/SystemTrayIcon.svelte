<script lang="ts">
  import { RNSystemTrayIcon } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNSystemTrayIcon>();
  type $$Props = typeof widget._props;
  type $$Events = typeof widget._events;
</script>

<systemTrayIcon {...$$restProps} bind:this={widget._el}>
  <slot />
</systemTrayIcon>
