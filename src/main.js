import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import request from "../utils/request.js"
Vue.prototype.request = request;

const app = new Vue({
  ...App
})
app.$mount()
