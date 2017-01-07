// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'fabric'
window._ = require('lodash')

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import App from './App'
import 'bootstrap-loader'

Vue.use(VueResource)
Vue.use(Vuex)

import store from './store/Store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})

