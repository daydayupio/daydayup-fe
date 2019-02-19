<template>
  <div class="header">
    <div class="logo">logo</div>
    <ButtonGroup class="right-options">
      <Button type="primary" @click="login">登录</Button>
      <Button type="default" @click="register">免费注册</Button>
    </ButtonGroup>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$emit("on-login");
    },
    register() {
      this.$emit("on-register");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 68px;
  padding: 16px;
  .logo {
  }
  .right-options {
    margin: 0 0 0 auto;
  }
}
</style>