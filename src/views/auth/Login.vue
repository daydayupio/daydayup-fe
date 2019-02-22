<template>
  <div class="login">
    <Form 
      ref="form" 
      :model="innerVal"
      >
      <FormItem prop="name">
        <i-input 
          v-model="innerVal.name" 
          @on-enter="handleSubmit" 
          type="text" 
          placeholder="用户名"
          >
          <Icon 
            type="ios-person-outline" 
            slot="prepend"
            ></Icon>
        </i-input>
      </FormItem>
      <FormItem prop="password">
        <i-input 
          v-model="innerVal.password" 
          @on-enter="handleSubmit" 
          type="password" 
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
          @click="handleSubmit"
          >登录</Button>
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
        password: ""
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
    handleSubmit() {
      this.$emit("on-login", this.innerVal);
    }
  }
};
</script>

<style lang="less" scoped>
</style>


