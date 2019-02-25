<template>
  <Layout class="auth-page">
    <Header class="header">
      <img 
        :src="logo" 
        class="logo"
        alt="daydayup"
        >
      <ButtonGroup
        class="options"
        >
        <Button
          @click="gotoLogin"
          type="ghost"
          size="large"
          >
          登录
        </Button>
        <Button
          @click="gotoRegister"
          type="ghost"
          size="large"
          >
          注册
        </Button>
      </ButtonGroup>
    </Header>
    <Layout class="body">
      <Content class="content">
        <component 
          :is="currentComp" 
          class="panel"
          @on-login="loginHandler" 
          @on-register="registerHandler"
          ></component>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import Login from "./Login";
import Register from "./Register";
import gql from "graphql-tag";
import { mutate, getVueApolloErrorMessage } from "../../utils/helper";
import { onLogin } from "../../vue-apollo.js";
export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      logo: require('../../assets/logo.svg')
    }
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
    menuOptionsHandler(action) {
      switch(action) {
        case 'login': {
          return this.gotoLogin()
        }
        case 'register': {
          return this.gotoRegister()
        }
      }
    },
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    gotoRegister() {
      this.$router.push({ name: "register" });
    },
    async loginHandler({ name, password }) {
      const [err, res] = await mutate(this, {
        mutation: gql`
          mutation login {
            token: login(name: "${name}", password: "${password}")
          }
        `
      });
      if (err) {
        const errorMessage = getVueApolloErrorMessage(err)
        this.$Message.error(errorMessage);
        return;
      }
      onLogin(this.$apolloProvider.clients.defaultClient, res.data.token);
      this.$router.push({ name: "home" });
    },
    async registerHandler({ name, password, email }) {
      const [err, res] = await mutate(this, {
        mutation: gql`
          mutation register {
            token: register(name: "${name}", email: "${email}" password: "${password}")
          }
        `
      });
      if (err) {
        const errorMessage = getVueApolloErrorMessage(err)
        this.$Message.error(errorMessage);
        return;
      }
      onLogin(this.$apolloProvider.clients.defaultClient, res.data.token);
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="less" scoped>
@header-height: 64px;
.auth-page {
  .header {
    height: @header-height;
    display: flex;
    align-items: center;
    .logo {
      width: 128px;
    }
    .options {
      margin-left: auto;
    }
  }
  .body {
    height: calc(~"100vh - @{header-height}");
    overflow: hidden;
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .panel {
      position: relative;
      width: 450px;
      padding: 16px;
      top: -10%;
    }
  }
}
</style>


