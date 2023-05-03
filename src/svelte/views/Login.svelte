<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../qt-components/Button.svelte";
  import Text from "../qt-components/Text.svelte";
  import TextField from "../qt-components/TextField.svelte";
  import View from "../qt-components/View.svelte";
  import { NSVElement, RNButton } from "src/rng";
  import { QColor, QPainter } from "@nodegui/nodegui";

  let username = "";
  let password = "";
  let loginStatus = "";

  function login() {
    try {
      if (username !== "admin" || password !== "admin") throw "login failed";
      loginStatus = `<span style="color: green;">Login Success</span>`;
    } catch (error) {
      loginStatus = `<span style="color: red;">${error}</span>`;
    }
  }
</script>

<View id="loginView">
  {#if username}<Text>Has username 0</Text>{/if}
  <Text class="text-center">Login View</Text>
  {#if loginStatus}
    <Text>{loginStatus}</Text>
  {/if}
  <TextField bind:value={username} class="text-center" id="username" />
  {#if username}<Text>Has username 2</Text>{/if}
  <TextField bind:value={password} class="text-center" id="password" />
  {#if username}<Text>Has username 3</Text>{/if}
  {#if loginStatus}
    <Text>{loginStatus}</Text>
  {/if}
  {#if username}<Text>Has username 4</Text>{/if}
  <Button id="btnLogin" on:clicked={login}>Login</Button>
  <Button id="btnLogin" on:clicked={() => (loginStatus = "")}>reset</Button>
</View>

<style lang="scss" global>
  #loginView {
    width: 100%;
    > * {
      padding: 5px;
    }
  }
</style>
