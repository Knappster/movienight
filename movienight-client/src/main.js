
import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueChatScroll from 'vue-chat-scroll';
 
Vue.use(VueSocketio, io('/'));
Vue.use(VueChatScroll);

new Vue({
	el: '#app'
	, render: h => h(App)
});
