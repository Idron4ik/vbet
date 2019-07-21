import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


const firebaseConfig = {
  apiKey: "AIzaSyBY6Ogh_2eTTtNk336TTJN6P5fwdD1mScA",
  authDomain: "vbet-dv21.firebaseapp.com",
  databaseURL: "https://vbet-dv21.firebaseio.com",
  projectId: "vbet-dv21",
  storageBucket: "vbet-dv21.appspot.com",
  messagingSenderId: "285125679508",
  appId: "1:285125679508:web:e06817c85fe7ce2b"
};
const firebseApp = firebase.initializeApp(firebaseConfig);

const db = firebseApp.firestore();

Vue.prototype.$db = db;