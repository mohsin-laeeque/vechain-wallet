import Vue from 'vue'
 
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";
import * as LottiePlayer from "@lottiefiles/lottie-player";

 
//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
 
new Vue({
  render: h => h(App),
}).$mount('#app')
 