<script lang="ts">
  import View from "../qt-components/View.svelte";
  import Login from "./Login.svelte";
</script>

<View id="container">
  <Login /> 
  <!-- <Button class="btn" on:clicked={increase}>Increase</Button>
  <Button class="btn" text="Show Text 123" on:clicked={increase} />
  <Button class="btn">{text}</Button>
  <TextField bind:text />
  <Text class="text" children="<i>Count :: {count} :: {dialValue}</i>" />
  <View>
    <Image src={avatar} class="avatar" />
  </View>
  <Dial bind:value={dialValue} class="dial" /> -->
</View>

<style global>
  * {
    font-size: 15px;
    font-family: "Segoe UI";
    font-weight: 600;
  }
  #container {
    flex-direction: row;
  }
  #container > *{
    width: 100% !important;
    flex: 1;
    padding: 10px;
  }
  .text-center{
    qproperty-alignment: AlignCenter;
  }
</style>
