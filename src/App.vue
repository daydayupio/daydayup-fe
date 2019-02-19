<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getAuthToken } from "./utils/helper";
export default {
  name: "app",
  components: {},
  created() {
    if (
      this.$route.name !== "login" &&
      this.$route.name !== "register" &&
      !getAuthToken()
    ) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style></style>
