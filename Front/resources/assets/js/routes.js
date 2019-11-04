/*
 |-------------------------------------------------------------------------------
 | routes.js
 |-------------------------------------------------------------------------------
 | Contains all of the routes for the application
 */

/**
 * Imports Vue and VueRouter to extend with the routes.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Extends Vue to use Vue Router
 */
Vue.use( VueRouter )

/**
 * Makes a new VueRouter that we will use to run all of the routes for the app.
 */
export default new VueRouter({
    routes: [
        {
            path: '/bbin-question-list',
            name: 'bbinquestion',
            component: Vue.component( 'bbinquestion', require( './pages/BBINQuestion.vue' ) )
        },
        {
            path: '/bbos-question-list',
            name: 'bbosquestion',
            component: Vue.component( 'bbosquestion', require( './pages/BBOSQuestion.vue' ) )
        },
        {
            path: '/language-list',
            name: 'language',
            component: Vue.component( 'Language', require( './pages/Language.vue' ) )
        },
        {
            path: '/message-list',
            name: 'message',
            component: Vue.component( 'Message', require( './pages/Message.vue' ) )
        },
    ]
});