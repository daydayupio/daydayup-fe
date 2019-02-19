<template>
  <div class="auth-page">
    <Header @on-login="gotoLogin" @on-register="gotoRegister"></Header>
    <component :is="currentComp"></component>
  </div>
</template>

<script>
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
export default {
  components: {
    Header,
    Login,
    Register
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
    isRegister() {
      return this.$route.name === "register";
    },
    currentComp() {
      return this.isLogin ? Login : Register;
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    gotoRegister() {
      this.$router.push({ name: "register" });
    }
  }
};
</script>

<style lang="less" scoped>
</style>


