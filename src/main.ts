import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdContent, MdToolbar, MdCard, MdField, MdSnackbar,
  MdLayout, MdChips, MdList, MdMenu, MdSwitch } from 'vue-material/dist/components'
// import VueMaterial from 'vue-material'
import VueClipboard from 'vue-clipboard2'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import './assets/font.css'

Vue.use(VueClipboard)
// Vue.use(VueMaterial)
Vue.use(MdButton)
Vue.use(MdSwitch)
Vue.use(MdChips)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdLayout)
Vue.use(MdToolbar)
Vue.use(MdSnackbar)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdCard)
Vue.use(MdField)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
