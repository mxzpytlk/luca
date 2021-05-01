import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faEye, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import VueComp from '@vue/composition-api';

library.add(faBars);
library.add(faFontAwesome);
library.add(faEye);
library.add(faCaretDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

Vue.use(VueComp);

Vue.filter('date', (date: Date) => date?.toISOString().slice(0, 10));
