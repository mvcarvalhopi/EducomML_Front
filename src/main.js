import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import axios from "axios";

/*import ModelTutorial from './components/ModelTutorial';*/
import UserHome from './components/UserHome';
import CreateConceitual from './components/CreateConceitual';
import AvaliacaoDialog from './components/instructional_model/AvaliacaoDialog';
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCTXLVMfqIhESiv4y0HHGLbaU_U7Lwcyys",
  authDomain: "project-994496824062.firebaseapp.com",
  storageBucket: "gs://testeapifiles.appspot.com/"
}
firebase.initializeApp(config);

Vue.config.productionTip = false
Vue.use(VueRouter);
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const router = new VueRouter({
  mode: 'history',
  routes: [

    {
      path: '/home',
      component: UserHome
    },
    {
      path: '/create/conceitual',
      name: 'createConceitual',
      component: CreateConceitual
    },
    {
      path: '/teste',
      name: 'teste',
      component: AvaliacaoDialog
    },
  ]
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
