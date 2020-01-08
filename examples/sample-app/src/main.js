import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VuePreferences from 'vue-preferences';
import 'vuetify/dist/vuetify.min.css';
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.use(Vuetify);
Vue.use(VuePreferences, { namespace: 'my-sample-app' });

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
