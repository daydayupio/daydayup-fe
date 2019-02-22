<template>
  <div class="login">
    <Form 
      ref="form" 
      :model="innerVal"
      >
      <FormItem prop="name">
        <i-input 
          type="text" 
          v-model="innerVal.name" 
          placeholder="用户名"
          >
          <Icon 
            type="ios-person-outline" 
            slot="prepend"
            ></Icon>
        </i-input>
      </FormItem>
      <FormItem prop="email">
        <i-input 
          type="text" 
          v-model="innerVal.email" 
          placeholder="邮箱"
          >
          <Icon 
            type="ios-mail-outline" 
            slot="prepend"
            ></Icon>
        </i-input>
      </FormItem>
      <FormItem prop="password">
        <i-input 
          type="password" 
          v-model="innerVal.password" 
          placeholder="密码"
          >
          <Icon 
            type="ios-lock-outline" 
            slot="prepend"
            ></Icon>
        </i-input>
      </FormItem>
      <FormItem>
        <Button 
          long
          type="primary" 
          @click="handleRegister"
          >注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        name: "",
        password: "",
        email: ""
      })
    }
  },
  computed: {
    innerVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    handleRegister() {
      this.$emit("on-register", this.innerVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>


