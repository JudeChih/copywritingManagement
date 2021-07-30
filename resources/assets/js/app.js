window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');

    require('foundation-sites');

    $(function() {
        $(document).foundation();
    });
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

import Vue from 'vue';
import router from './routes.js';
import Element from 'element-ui';
import VueClipboard from 'vue-clipboard2'
import HighlightText from 'vue-highlight-text';
import highlight from 'vue-highlight-text/public/directive.min';
Vue.config.productionTip = false;
Vue.directive('highlight', highlight);
Vue.component('HighlightText', HighlightText);
Vue.use(Element);
Vue.use(VueClipboard);
var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll);

Vue.config.devtools = true; // 可以開啟
Vue.config.productionTip = true;

new Vue({
    router,
}).$mount('#app');



// 現在時間
var now = new Date(); //create a new Date
var year = now.getFullYear();
var mm = (now.getMonth());
var dd = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();
var sec = now.getSeconds();

function setTime(){

    var now = new Date(); //create a new Date
    var year = now.getFullYear();
    var mm = (now.getMonth());
    var dd = now.getDate();
    var wkd = now.getDay();
    var hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
    var min = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
    var sec = now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
    
    // Get Date
    $('.date').html(dd);

    if (mm == 0) {
        $('.month').html("JAN");
    }
    else if (mm == 1) {
        $('.month').html("FEB");
    }
    else if (mm == 2) {
        $('.month').html("MAR");
    }
    else if (mm == 3) {
        $('.month').html("APR");
    }
    else if (mm == 4) {
        $('.month').html("MAY");
    }
    else if (mm == 5) {
        $('.month').html("JUN");
    }
    else if (mm == 6) {
        $('.month').html("JUL");
    }
    else if (mm == 7) {
        $('.month').html("AUG");
    }
    else if (mm == 8) {
        $('.month').html("SEP");
    }
    else if (mm == 9) {
        $('.month').html("OCT");
    }
    else if (mm == 10) {
        $('.month').html("NOV");
    }
    else {
        $('.month').html("DEC");
    }

    if (wkd == 0) {
        $('.day').html("SUN");
    }
    else if (wkd == 1) {
        $('.day').html("MON");
    }
    else if (wkd == 2) {
        $('.day').html("TUS");
    }
    else if (wkd == 3) {
        $('.day').html("WED");
    }
    else if (wkd == 4) {
        $('.day').html("THU");
    }
    else if (wkd == 5) {
        $('.day').html("FRI");
    }
    else {
        $('.day').html("SAT");
    }

    $('.time').html(hour + ":" + min);

    if (hour >= 12){
      $('.ampm').html("PM");
    }
    else {
      $('.ampm').html("AM");
    }

};

// Set Interval to refresh the clock every second
setInterval(setTime, 100);
