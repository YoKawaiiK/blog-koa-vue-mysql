import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie';

// framework css
import './../node_modules/bulma/css/bulma.css';

// библиотека готовых компонентов
import 'buefy/dist/buefy.css'
import {ConfigProgrammatic, Snackbar, Modal, Pagination} from 'buefy'

// fas icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight, faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleLeft, faAngleRight, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios, axios)
    .use(VueCookie)
    // Buefy components
    .use(Snackbar)
    .use(Modal)
    .use(Pagination)

ConfigProgrammatic.setOptions({
    defaultIconPack: 'fas',
    defaultIconComponent: 'font-awesome-icon'
})




Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
