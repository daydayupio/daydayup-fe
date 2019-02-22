import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createProvider } from "./vue-apollo";
import "iview/dist/styles/iview.css"
import "./style.less"
import moment from 'moment'
moment.locale('zh-cn')
const iView = require('iview')
// import "./plugins/iview.js"

Vue.config.productionTip = false;
Vue.use(iView)

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
