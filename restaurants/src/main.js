import Vue from 'vue'
import App from './App.vue'
import store from './store/store'

import router from './router/index.js'
import './styles/styles.scss'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDZ6K7KvJq8AdqOIX_TE-sziXpZLIT3U-I',
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
  },
})