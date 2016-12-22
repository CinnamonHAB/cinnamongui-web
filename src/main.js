// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'fabric'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import 'bootstrap-loader'

Vue.use(Vuex)

import store from './Store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})

