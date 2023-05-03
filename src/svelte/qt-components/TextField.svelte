<script lang="ts">
  import { RNLineEdit } from "src/rng";
  import { SvelteNative } from "./SvelteNative";

  const widget = new SvelteNative<RNLineEdit>();

  type $$Props = typeof widget._props & {
    value?: string;
  };
  type $$Events = typeof widget._events;

  widget.onMount(() => {
    widget.native.addEventListener("textChanged", (_text) => (value = _text));
  });

  export let value = "";
</script>

<lineEdit {...$$restProps} bind:this={widget._el} text={value}>
  <slot />
</lineEdit>
