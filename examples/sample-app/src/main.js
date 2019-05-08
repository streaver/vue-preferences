import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VuePreferences from 'vue-preferences';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(VuePreferences);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
