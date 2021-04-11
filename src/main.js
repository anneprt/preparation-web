import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate'
import fr from 'vee-validate/dist/locale/fr.json'
import * as rules from 'vee-validate/dist/rules'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// Déclaration dans l'instance de vue (utilisateur via this.$axios dans les fichiers .vue)
Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// Déclaration globale des objets
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// Traduction des messages 
localize('fr', fr)

// Import de toutes les règles de validation de vee validate
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
